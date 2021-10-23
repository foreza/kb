#!/bin/bash

now=$(date +'%m/%d/%Y')
commitString="adding a new daily gratitude for:"$now

git add daily-gratitude/*
git commit -m "$commitString"
git push