注：
问题：先前所遇问题为->图片资源放在src/assets中开发时能够访问 打包之后路径成为static/css/static/img
解决：将图片资源存放在与src同级的static目录下且访问图片时在html中访问，切不可在style的css中访问，因为路径
	由html访问，static/img/图片名是能够正确访问到图片，而css中访问 static/css/static/img由于css中没有
	static目录，故造成了路径访问失败的问题。
