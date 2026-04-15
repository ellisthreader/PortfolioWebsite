#!/usr/bin/env bash

set -euo pipefail

PROJECT_DIR="${1:-$(pwd)}"
REQUIRED_NODE_MAJOR=22
REQUIRED_PHP_MAJOR=8
REQUIRED_PHP_MINOR=2
LARAVEL_BIN="${HOME}/.config/composer/vendor/bin/laravel"
TEMP_SCAFFOLD_DIR=""

cleanup() {
  if [[ -n "${TEMP_SCAFFOLD_DIR}" && -d "${TEMP_SCAFFOLD_DIR}" ]]; then
    rm -rf "${TEMP_SCAFFOLD_DIR}"
  fi
}

trap cleanup EXIT

log() {
  printf '\n==> %s\n' "$1"
}

fail() {
  printf '\n[error] %s\n' "$1" >&2
  exit 1
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

ensure_command() {
  local cmd="$1"
  local help_text="$2"

  if ! command_exists "$cmd"; then
    fail "$cmd is required. $help_text"
  fi
}

ensure_php_version() {
  local version major minor
  version="$(php -r 'echo PHP_MAJOR_VERSION.".".PHP_MINOR_VERSION;')"
  major="${version%%.*}"
  minor="${version##*.}"

  if (( major < REQUIRED_PHP_MAJOR )) || { (( major == REQUIRED_PHP_MAJOR )) && (( minor < REQUIRED_PHP_MINOR )); }; then
    fail "PHP ${REQUIRED_PHP_MAJOR}.${REQUIRED_PHP_MINOR}+ is required, but ${version} is installed."
  fi
}

setup_fnm() {
  if ! command_exists fnm; then
    log "Installing fnm"
    curl -fsSL https://fnm.vercel.app/install | bash
  fi

  # shellcheck disable=SC1090
  eval "$(fnm env --shell bash)"
}

ensure_node() {
  local current_major

  setup_fnm

  if command_exists node; then
    current_major="$(node -p 'process.versions.node.split(`.`)[0]')"
  else
    current_major=0
  fi

  if (( current_major < REQUIRED_NODE_MAJOR )); then
    log "Installing Node ${REQUIRED_NODE_MAJOR} with fnm"
    fnm install "${REQUIRED_NODE_MAJOR}"
  fi

  fnm use "${REQUIRED_NODE_MAJOR}" >/dev/null

  log "Using Node $(node -v) and npm $(npm -v)"
}

ensure_laravel_installer() {
  if [[ ! -x "$LARAVEL_BIN" ]]; then
    log "Installing Laravel installer"
    composer global require laravel/installer
  fi
}

ensure_empty_or_existing_laravel_dir() {
  if [[ ! -d "$PROJECT_DIR" ]]; then
    mkdir -p "$PROJECT_DIR"
  fi

  if [[ -f "$PROJECT_DIR/artisan" && -f "$PROJECT_DIR/composer.json" ]]; then
    return
  fi

  if [[ -n "$(find "$PROJECT_DIR" -mindepth 1 -maxdepth 1 ! -name 'setup-react-laravel.sh' ! -name 'RUN_THIS_COMMAND.txt' | head -n 1)" ]]; then
    fail "Target directory is not empty: $PROJECT_DIR"
  fi
}

scaffold_if_needed() {
  if [[ -f "$PROJECT_DIR/artisan" && -f "$PROJECT_DIR/composer.json" ]]; then
    log "Laravel app already present, skipping scaffold"
    return
  fi

  log "Scaffolding Laravel + React + TypeScript starter kit"
  TEMP_SCAFFOLD_DIR="$(mktemp -d)/laravel-app"
  "$LARAVEL_BIN" new "$TEMP_SCAFFOLD_DIR" \
    --react \
    --pest \
    --npm \
    --no-interaction

  shopt -s dotglob nullglob
  cp -a "$TEMP_SCAFFOLD_DIR"/* "$PROJECT_DIR"/
  shopt -u dotglob nullglob
  rm -rf "$TEMP_SCAFFOLD_DIR"
  TEMP_SCAFFOLD_DIR=""
}

configure_local_app() {
  cd "$PROJECT_DIR"

  if [[ ! -f .env && -f .env.example ]]; then
    cp .env.example .env
  fi

  php artisan key:generate --force

  if grep -q '^DB_CONNECTION=' .env; then
    sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=sqlite/' .env
  else
    printf '\nDB_CONNECTION=sqlite\n' >> .env
  fi

  if grep -q '^DB_DATABASE=' .env; then
    sed -i 's|^DB_DATABASE=.*|DB_DATABASE=database/database.sqlite|' .env
  else
    printf 'DB_DATABASE=database/database.sqlite\n' >> .env
  fi

  mkdir -p database
  touch database/database.sqlite

  php artisan migrate --graceful --force

  if [[ -f tests/Pest.php ]]; then
    perl -0pi -e "s|// ->use\\(RefreshDatabase::class\\)|    ->use(RefreshDatabase::class)|" tests/Pest.php
  fi
}

verify_app() {
  cd "$PROJECT_DIR"

  log "Installing frontend packages"
  npm install

  log "Building frontend"
  npm run build

  log "Running backend tests"
  php artisan test
}

print_next_steps() {
  cat <<EOF

Setup complete.

Start the app with:
  cd "$PROJECT_DIR"
  eval "\$(fnm env --shell bash)"
  fnm use ${REQUIRED_NODE_MAJOR}
  composer run dev

That starts:
  - Laravel on http://127.0.0.1:8000
  - Vite for the React frontend
  - The queue worker
  - Laravel logs via Pail
EOF
}

main() {
  ensure_command curl "Install curl and rerun the script."
  ensure_command php "Install PHP ${REQUIRED_PHP_MAJOR}.${REQUIRED_PHP_MINOR}+ and rerun the script."
  ensure_command composer "Install Composer and rerun the script."
  ensure_php_version
  ensure_empty_or_existing_laravel_dir
  ensure_node
  ensure_laravel_installer
  scaffold_if_needed
  configure_local_app
  verify_app
  print_next_steps
}

main "$@"
