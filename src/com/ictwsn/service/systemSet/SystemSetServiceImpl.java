package com.ictwsn.service.systemSet;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;


import com.ictwsn.dao.systemSet.SystemSetDao;

@Service
public class SystemSetServiceImpl implements SystemSetService{

	@Resource SystemSetDao dao;
}

