count=`yarn check:find-deadcode | wc -l`

if [ $count -gt 3 ]
then
  echo "Some code is unused"
  yarn check:find-deadcode
  exit 1
else
  echo "No deadcode :)"
fi
