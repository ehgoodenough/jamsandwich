git clone https://github.com/ehgoodenough/jamsandwich --branch gh-pages shares

node build --production

mkdir -p ./shares/$1
cp -r ./builds/web/* ./shares/$1

git --git-dir=./shares/.git --work-tree=./shares add .
git --git-dir=./shares/.git --work-tree=./shares commit -m "Pushed $1"
git --git-dir=./shares/.git --work-tree=./shares push origin gh-pages

rm -rf shares

echo
echo Share your build by going to:
echo https://ehgoodenough.github.io/jamsandwich/$1
echo
