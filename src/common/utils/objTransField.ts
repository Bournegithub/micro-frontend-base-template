export const deepObjTransField = (data = [] as Array<any>, fields = {} as {[key: string]: string}) => {
	// fields: { oldFiled: newField }
	if (Object.keys(fields).length <= 0) {
		console.log('请传入需要转换字段的健值对');
		return data;
	}
	data.forEach((item: any) => {
		// 遍历映射对象
		Object.keys(fields).forEach((key: string) => {
			// 目标对象上存在key, 则增加属性赋给原属性的值
			if(item[key as keyof typeof fields]) {
				item[fields[key]] = item[key as keyof typeof fields];
			}
		})
		if(item.children?.length) {
			deepObjTransField(item.children, fields);
		}
	});
	return data;

};
