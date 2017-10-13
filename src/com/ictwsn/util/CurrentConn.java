package com.ictwsn.util;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

/**
 * 功能模块：实时数据模块数据库连接
 * @author 叶崇宇
 * 
 */
public class CurrentConn{

	private static String driver;
	private static String url ;
	private static String user ;
	private static String password;

	private static CurrentConn CONN = null;  //CurrentConn类单例对象

	private CurrentConn(){}

	//静态工厂方法 ,保证只有该类只有一个实例,节省内存
	public synchronized static CurrentConn getInstance() {
		if (CONN == null) {  
			CONN = new CurrentConn();
		}  
		return CONN;
	}

	static{  //静态块,读取参数配置,只加载一次
		Properties prop = new Properties();
		try {
			InputStream is = CurrentConn.class.getResourceAsStream("/db.properties");
			prop.load(is);

			driver = prop.getProperty("driver");
			url = prop.getProperty("url");
			user = prop.getProperty("user");
			password = prop.getProperty("password");

			is.close();
			Class.forName(driver);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}


	public Connection getConn(){
		try{
			Connection conn= DriverManager.getConnection(url, user, password);
			return conn;
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		

	}

	public void closeConnection(Connection conn) {

		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

	}

	public void closePreparedStatement(PreparedStatement ps) {

		if (ps != null) {
			try {
				ps.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

	}

	public void closeResultSet(ResultSet rs) {

		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

	}

}
