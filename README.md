# create README.md
echo "# HerbalChain" > README.md

# create .gitignore (important to ignore node_modules and env files)
@"
node_modules/
.env
.DS_Store
frontend/node_modules/
mobile/node_modules/
"@ > .gitignore
