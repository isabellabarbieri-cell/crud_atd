import mysql.connector

def conectar():
    return mysql.connector.connect(
        host="localhost", # Endereço do servidor MySql
        user="root", #usuaro do banco de dados
        password="root@root", #senha do MySql
        database="achados_perdidos" #nome do banco criado no modulo 2
    )