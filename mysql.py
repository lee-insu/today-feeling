import pymysql

MY_SQL = 'localhost'
MYSQL_CONN = pymysql.connect(
    host = MY_SQL,
    port = 3306,
    user = 'root',
    passwd = 'rootmysql',
    db = 'board_db3',
    charset = 'utf8mb4'
)

def conn_mysqldb():
    if not MYSQL_CONN.open:
        MYSQL_CONN.ping(reconnect=True)
    return MYSQL_CONN