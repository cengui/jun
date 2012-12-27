/**
	api doc
*/

sockte.io

	client:
		// -------emit--------------------
		//系统为用户创建一个房间 并返回房间号
		create
			options:null
		
		//加入一个已经存在的房间
		join:
			options:{
				number:10//房间号
				color: //执棋颜色
			};
		//落子
		lazi:
			options{
				x:x,
				y:y,
				color:
			};
			
		// --------on---------------
		
		create:
			return {
				number:0
				color: //执棋颜色
			};
			
		join:
			return {
				code:0
			};
			
		lazi:
			return {
				code:0
			}
		status:
			return {
				number:
				status://状态变化
			}
		