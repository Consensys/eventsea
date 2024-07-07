set -euo pipefail

error_exit() {
    echo "Error: $1"
    exit 1
}

ARTIFACTS_DEST=../../apps/web/lib/contracts/artifacts
TYPES_DEST=../../apps/web/lib/contracts/typechain-types

cd packages/blockchain

npm run compile || error_exit "Failed to compile contracts"

mkdir -p $ARTIFACTS_DEST
mkdir -p $TYPES_DEST

cp -r artifacts/contracts/* $ARTIFACTS_DEST || error_exit "Failed to copy contract artifacts"
echo "Contracts artifacts  successfully copied to $ARTIFACTS_DEST"

cp -r typechain-types/* $TYPES_DEST || error_exit "Failed to copy typechain types"
echo "Typechain types successfully copied to $TYPES_DEST"
