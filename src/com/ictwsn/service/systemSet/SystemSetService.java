package com.ictwsn.service.systemSet;

import java.util.List;

import com.ictwsn.bean.CanMessageBean;


/**
 * 超级管理员service层接口类
 * @author YangYanan
 * @desc
 * @date 2017-8-18
 */
public interface SystemSetService {
	public List<CanMessageBean> getCanMessageList();
	public String getCanSignalListStr(int id);
	public int getDclById(int id);
	 
}
