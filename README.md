分支名用自己的名字全拼不要提交到主分支，用合并到主分支

git操作流程

(1)在自己分支上：
git status查看状态
git add ./
git commit -am"信息"
git push

(2)push完后
切换到主分支master
git checkout master
git pull 拉取远程仓库最新状态的代码
git megre 自己分支名
git status 产看状态 ： 
如果会现红色的文件，先不要提交，在代码编辑器中找到飘红文件，里面会含有Head<<<<<<或者<<<<<<<<或者自己分支名<<<<<<<
删了，并在主分支运行代码，确保主分支代码能正常运行后
控制台输出命令：
git add ./
git status
git commit -m"谁添加了什么内容或者修改了什么bug"
git push


(3) 上述工作完成后，就可以回到自己分支
回到自子分支
先输入
git pull 获取远程仓库最新状态的代码
然后就可以继续写新的代码，完成功能后，继续上述操作