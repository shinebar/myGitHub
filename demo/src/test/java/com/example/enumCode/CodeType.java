package com.example.enumCode;

public enum CodeType {
	
	CHECKTASKNO(18, "checktaskno", "清查任务编号", 1, 5, true, "0"),
	OUTSIDEBILLNO(17, "outsideBillNo", "外发单", 1, 5, true, "0"),
	PACKAGENO(1, "packageNo", "包号", 1, 7, true, "0"),
	CAGENO(2, "cageNo", "笼号", 1, 7, true, "0"),
	SURFACENOMORE(3, "surfaceNoMore", "PC端无面单多货编码", 1, 4, true, "0"),
	LOADTASKNO(4, "loadTaskNo", "装车任务号", 1, 7, true, "0"),
	AIRLOADTASKNO(5, "airLoadTaskNo", "空运装车任务号", 1, 7, true, "0"),
	CLEANSTOCKTASKNO(6, "cleanStockTaskNo", "清仓任务编码", 1, 5, true, "0"),
	HANDOVERNOL(7, "handoverNoL", "外场-外场长途交接单号", 1, 7, true, "0"),
	HANDOVERNOS(8, "handoverNoS", "外场-营业部短途交接单号", 1, 7, true, "0"),
	HANDOVERNOA(9, "handoverNoA", "空运装车生成交接单号", 1, 7, true, "0"),
	HANDOVERTRAINSNOL(10, "handoverTrainsNoL", "长途交接单的车次号", 1, 2, true, "0"),
	HANDOVERTRAINSNOS(11, "handoverTrainsNoS", "短途交接单的车次号", 1, 2, true, "0"),
	UNLOADTASKNO(12, "unloadTaskNo", "卸车任务编号", 1, 5, true, "0"),
	DEPARTLOADTASKNO(13, "departLoadTaskNo", "点部装车", 1, 6, true, "0"),
	AGENTHANDOVERNO(14, "agentHandoverNo", "快递代理交接单", 1, 7, true, "0"),
	MQMESSAGEID(15, "mqMessageId", "MQ消息标识", 1, 6, true, "0"),
	AGENTLOADTASKNO(16, "agentLoadTaskNo", "外发代理装车任务编号", 1, 5, true, "0"),
	AIRPORTTASKNO(19, "airportTaskNo", "机场扫描任务编号", 1, 5, true, "0"),
	PTPHANDOVERNOS(8, "ptphandoverNo", "合伙人交接单号", 1, 7, true, "0");	/**
	 * 英文code
	 */
	private String code;
	/**
	 * id
	 */
	private int id;
	/**
	 * 描述
	 */
	private String desc;
	/**
	 * 步长
	 */
	private int step;
	/**
	 * 保留位数
	 */
	private int digit;
	
	/**
	 * 原始值
	 */
	private long keyvalue;
	/**
	 * 是否填充
	 */
	private boolean isFill;
	/**
	 * 填充内容
	 */
	private String fillCode;
	
	/**
	 * 更新结果
	 */
	private int updateresult;

	CodeType(int id, String code, String desc, int step, int digit,
			boolean isFill, String fillCode) {
		this.code = code;
		this.id = id;
		this.desc = desc;
		this.step = step;
		this.digit = digit;
		this.isFill = isFill;
		this.fillCode = fillCode;
	}

	
	
	public int getUpdateresult() {
		return updateresult;
	}



	public void setUpdateresult(int updateresult) {
		this.updateresult = updateresult;
	}



	public String getCode() {
		return code;
	}
	public int getId() {
		return id;
	}
	public String getDesc() {
		return desc;
	}
	public int getStep() {
		return step;
	}
	public int getDigit() {
		return digit;
	}
	public boolean isFill() {
		return isFill;
	}
	public String getFillCode() {
		return fillCode;
	}

	public long getKeyvalue() {
		return keyvalue;
	}

	public void setKeyvalue(long keyvalue) {
		this.keyvalue = keyvalue;
	}

	

}
