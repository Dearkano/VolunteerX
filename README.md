# [VolunteerX](https://github.com/Dearkano/VolunteerX) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![Coverage Status](https://img.shields.io/coveralls/facebook/react/master.svg?style=flat)](https://coveralls.io/github/facebook/react?branch=master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

**VolunteerX** 是一个基于区块链的志愿者公益捐赠一体化服务平台

* **透明公益：** 通过区块链技术，将公益捐献流程透明化，公益资金流向可追溯化
* **共识捐献：** 通过志愿者投票达成共识，选择捐献项目，将选择权去中心化
* **志愿者激励：** 通过参与志愿者服务活动，志愿者获取投票通证作为激励，可以通过投票通证进行捐献人选择，形成志愿者活动正反馈循环
* **资金安全：** 通过合作银行发行人民币锚定的稳定通证，进行系统中资金的流通，受捐人通过合作银行兑换法币或直接通过合作电商兑换捐献物资，保障公益资金的正确使用

## 项目技术

### 区块链
* [Hyperledger Fabric](https://gerrit.hyperledger.org/r/#/admin/projects/fabric) ^1.2
* [Hyperledger Composer](https://github.com/hyperledger/composer) ^0.20

### 部署环境 
* 腾讯云 4vCPU 32G内存 
* Ubuntu 16.04
* Docker 18.05.0-ce
* npm 6.0.1

### 前端
* [React](https://github.com/facebook/react) ^16.7.0-alpha
* [Antd-mobile](https://mobile.ant.design) 2.2.2

### 对象储存
* [七牛云](https://www.qiniu.com/)

## 前端开发
* 下载项目

`git clone https://github.com/Dearkano/VolunteerX.git`
* 安装依赖

`npm install`
* 运行开发

`npm run dev`
* 项目构建

`npm run build`

## 智能合约开发
*在Ubuntu上运行*
### 第一次启动
```
cd

git clone https://github.com/Dearkano/VolunteerX.git

```

安装开发环境
```
curl -O https://hyperledger.github.io/composer/latest/prereqs-ubuntu.sh

chmod u+x prereqs-ubuntu.sh


./prereqs-ubuntu.sh
```

安装composer

`npm install -g composer-cli@0.20`

安装rest server

`npm install -g composer-rest-server@0.20`

安装fabric工具包
```
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz

tar -xvf fabric-dev-servers.tar.gz
```

下载fabric镜像
```
cd ~/fabric-dev-servers

export FABRIC_VERSION=hlfv12

./downloadFabric.sh
```

启动fabric网络
```
cd ~/fabric-dev-servers

export FABRIC_VERSION=hlfv12

./startFabric.sh

./createPeerAdminCard.sh
```

启动composer网络

`cd ~/VolunteerX/contract`

安装composer网络 此处版本更新为package.json中的版本

`composer network install --card PeerAdmin@hlfv1 --archiveFile volunteerx-network@0.1.0.bna`

启动composer网络

`composer network start --networkName volunteerx-network --networkVersion 0.1.0 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card`

导入composer card

`composer card import -f networkadmin.card`

验证是否安装成功

`composer network ping -c admin@volunteerx-network`

启动rest server 网络名称与上面保持一致 test server与public net选择Y 其余N

`composer-rest-server`

### 更新网络
更新model与logic的内容后，需要更改package.json中的版本

```
composer archive create --sourceType dir --sourceName . -a volunteerx-network@0.1.1.bna

composer network install --card PeerAdmin@hlfv1 --archiveFile volunteerx-network@0.1.1.bna

composer network upgrade -c PeerAdmin@hlfv1 -n volunteerx-network -V 0.1.1

composer-rest-server
```

### 关闭网络
```
cd fabric-dev-servers

./stopFabric.sh

./teardownFabric.sh
```

### 删除环境
```
docker kill $(docker ps -q)

docker rm $(docker ps -aq)

docker rmi $(docker images dev-* -q)
```
