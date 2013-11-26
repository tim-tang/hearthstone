#!/bin/sh
#Aim：Import cards into schema.
#Author: timtang

#export PG_DATA=/usr/local/pgsql/data

usage()
{
    echo
    echo "####################HEARTH STONE CARDS EXPORT#########################"
    echo
    echo " USAGE: card-import.sh -H <hearthstone-srv> -u <user> -p <pass>  -d dump_file [OPTION]... "
    echo
    echo " General options:"
    echo
    echo " -u,  connect as specified *HEARTH STONE USER*(required*, e.g. tim)"
    echo
    echo " -p,  -p hearthstone password.(required*)"
    echo
    echo " -d,  path of specified dump file.(required*)"
    echo
    echo " -H,  -H localhost,  specify the hearthstone server host(required*)"
    echo
    echo " -h,  show help message, then exit"
    echo
}


while getopts u:p:H:d:h opt
do
    case $opt in
        u) HEARTHSTONE_USER=$OPTARG
            ;;
        p) HEARTHSTONE_PASS=$OPTARG
            ;;
        H) HEARTHSTONE_HOST=$OPTARG
            ;;
        d) DUMP_FILE=$OPTARG
            ;;
        h) usage
            exit 0
            ;;
        ?) echo "The option you typed is not in upHdh,please type card-import.sh -h for help"
            exit 0
            ;;
    esac
done

#if [ ! -n "$HEARTHSTONE_USER" -o ! -n "$HEARTHSTONE_PASS" -o ! -n "$HEARTHSTONE_HOST" -o ! -n "$DUMP_FILE" ];then
if [ ! -n "$HEARTHSTONE_USER" -o ! -n "$HEARTHSTONE_PASS" -o ! -n "$HEARTHSTONE_HOST" ];then
    echo "USAGE ERROR:"
    echo "Must be specify the hearthstone user& hearthstone password& dump file! Execute: card-import.sh -h to see the help reference."
    echo
    exit 0
fi

HEARTHSTONE_TOKEN=$(curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X POST $HEARTHSTONE_HOST/user/login -d  '{"name": "'"$HEARTHSTONE_USER"'","pass": "'"$HEARTHSTONE_PASS"'"}' | grep 'hearthstone_srv' | awk -F";" '{print $1}'|cut -f2 -d "=")

curl -iv -H "Content-Type: application/json" -H "Accept: application/json" -b "hearthstone_srv=$HEARTHSTONE_TOKEN" -X POST $HEARTHSTONE_HOST/card/import -d @$DUMP_FILE
