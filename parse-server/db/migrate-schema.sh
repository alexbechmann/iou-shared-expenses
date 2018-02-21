for filename in /home/dump/_SCHEMA/*.bson; do
  echo $filename
  mongorestore $filename --collection _SCHEMA --db db
done
