import mysql.connector
# Connect to server

cnx = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="",
    database="mydb"
    )


# Get a cursor
cur = cnx.cursor()


# Execute a query
cur.execute("SELECT * FROM mytable")

myresult = cur.fetchall()

for x in myresult:
  print(x)
cnx.close()