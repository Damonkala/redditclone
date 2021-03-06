#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name."
  exit 1
fi

mongoimport --jsonArray --drop --db $1 --collection users --file ../db/users.json
mongoimport --jsonArray --drop --db $1 --collection posts --file ../db/posts.json
mongoimport --jsonArray --drop --db $1 --collection comments --file ../db/comments.json
