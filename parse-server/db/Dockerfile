FROM mongo

COPY ./data/ /home/dump/
COPY mongo-entrypoint.sh /mongo-entrypoint.sh
COPY migrate-schema.sh /migrate-schema.sh

ENTRYPOINT /mongo-entrypoint.sh
