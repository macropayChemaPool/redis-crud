print_message() {
  local step="$1"
  local command="$2"
  echo -e "\e[34m➡️  Step $step: $command\e[0m"
}

print_message 1 "Run... 'npm install'"
npm install

print_message 2 "Run... 'npm ci'"
npm ci

print_message 3 "Run... 'prepare:husky'"
npm run prepare:husky

print_message 4 "Run... 'fix lint'"
npm run lint -- --fix
