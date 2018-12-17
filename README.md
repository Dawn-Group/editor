# editor
> eigen-editor version 2

# Lerna用法 
1. npm i yarn -g
1. yarn global add lerna
1. lerna bootstrap
1. lerna add p1--scope  p2 安装包p1到p2
1. lerna create p [dir] 在dir目录想创建包p
1. lerna publish 发布包
1. lerna run script 执行每个包中的script
1. lerna version 改变包的版本

# 插件开发
**策略模式**  
插件通过onChange事件在适当的时机去改变编辑器的editorState。

## 开发流程
  
1. 创建插件包  
在根目录下创建包   
```sh
lerna create  package-name --scope plugins
```
1. 配置插件项目进行开发  
可以复制其他包的配置文件稍做修改即可。
    ```sh
    lerna bootstrap
    ```

1. 打包发布插件  
当插件开发完成并通过测试，可以打包并集成到编辑器中。
    ```sh
    lerna publish

    ```


