#!/bin/sh
npx hardhat compile

DIR_PATH=$(cd $(dirname ""$0) && pwd)
DIR_PATH=$DIR_PATH/..

rm -rf build/generate

ABI_PATH="build/generate/src/abi"
JS_ABI_PATH="build/generate/src/js"
GO_ABI_PATH="build/generate/src/go"
JAVA_ABI_PATH="build/generate/src/java"

JAVA_PACKAGE="com.contract.abi"

mkdir -p $ABI_PATH
mkdir -p $JS_ABI_PATH
mkdir -p $GO_ABI_PATH
mkdir -p $JAVA_ABI_PATH

npx hardhat run scripts/generate.ts

function read_dir(){
    
    for file in $(ls $1)
    do
        file_basename=$(basename $file .abi)
        web3j generate solidity -a $1"/"$file -o $JAVA_ABI_PATH -p $JAVA_PACKAGE
        abigen --abi=$1"/"$file --pkg=$file_basename --out=$GO_ABI_PATH"/"$file_basename.go
    done
}   

read_dir $ABI_PATH