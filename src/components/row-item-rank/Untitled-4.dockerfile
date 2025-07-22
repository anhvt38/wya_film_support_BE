zcat /usr/share/doc/zabbix-sql-scripts/mysql/server.sql.gz | mysql -uzabbix -p zabbix
zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | mysql -uzabbix -p abcd#1234

====


+--------+----------+--------+---------------+--------------------------------------------------------------+-----+-----------+------------+---------+---------+---------+----------------+------------+---------------+---------------+----------+--------+
| userid | username | name   | surname       | passwd                                                       | url | autologin | autologout | lang    | refresh | theme   | attempt_failed | attempt_ip | attempt_clock | rows_per_page | timezone | roleid |
+--------+----------+--------+---------------+--------------------------------------------------------------+-----+-----------+------------+---------+---------+---------+----------------+------------+---------------+---------------+----------+--------+
|      1 | Admin    | Zabbix | Administrator | $2y$10$92nDno4n0Zm7Ej7Jfsz8WukBfgSS/U0QkIuu8WkJPihXBb2A1UrEK |     |         1 | 0          | default | 30s     | default |              0 |            |             0 |            50 | default  |      3 |
|      2 | guest    |        |               | $2y$10$89otZrRNmde97rIyzclecuk6LwKAsHN0BcvoOKGjbT.BwMBfm7G06 |     |         0 | 15m        | default | 30s     | default |              0 |            |             0 |            50 | default  |      4 |
+--------+----------+--------+---------------+--------------------------------------------------------------+-----+-----------+------------+---------+---------+---------+----------------+------------+---------------+---------------+----------+--------+
