<template>
    <div ref="dragBox" class="dragBox"
    @touchstart="touchstartHandle('dragBox',$event)"
    @touchmove="touchmoveHandle('dragBox',$event)"
    @touchend="touchendHandle('dragBox',$event)">
    <button @click.stop="goHome"><img :src="homeLogo"><span>主页</span></button>  
    </div>
    
</template>

<script>
import homeUrl from '@/api/goIndex'
export default {
    name:'BackHome',
    data(){
        return {
            homeLogo: require('@a/indexVue/home.png'),
            coordinate: {
                client: {},
                elePosition: {}
            }
        }
    },
    methods:{
        goHome: function(){
            // console.log((this.$route.path).replace('/',''))
            // if((this.$route.path).replace('/','') != ''){
            //     this.$router.push('/');
            // }
           window.location.href = homeUrl;
        },
        touchstartHandle(refName, e) {
            e.preventDefault();//禁止滚动时，底层body也跟随这滚动
            let element = e.targetTouches[0]
            // 记录点击的坐标
            this.coordinate.client = {
                x: element.clientX,
                y: element.clientY
            }
            // 记录需要移动的元素坐标
            this.coordinate.elePosition.left = this.$refs[refName].offsetLeft
            this.coordinate.elePosition.top = this.$refs[refName].offsetTop

        },
        touchmoveHandle(refName, e) {
            let element = e.targetTouches[0]
            // 根据初始 client 位置计算移动距离(元素移动位置=元素初始位置+光标移动后的位置-光标点击时的初始位置)
            let x = this.coordinate.elePosition.left + (element.clientX - this.coordinate.client.x)
            let y = this.coordinate.elePosition.top + (element.clientY - this.coordinate.client.y)
            // 限制可移动距离，不超出可视区域
            x = x <= 0 ? 0 : x >= innerWidth - this.$refs[refName].offsetWidth ? innerWidth - this.$refs[refName].offsetWidth : x
            y = y <= 0 ? 0 : y >= innerHeight - this.$refs[refName].offsetHeight ? innerHeight - this.$refs[refName].offsetHeight : y
           
            this.$refs[refName].style.left = x + 'px'
            this.$refs[refName].style.top = y + 'px'
        },
        touchendHandle(refName, e) {
            console.log("innerWidth/2 " + innerWidth/2)
            console.log('left:'+this.$refs[refName].style.left +' elePositionleft:'+ this.coordinate.elePosition.left + ' elePositiontop:'+this.coordinate.elePosition.top +' top'+ this.$refs[refName].style.top )
            let currentLeft = (this.$refs[refName].style.left).replace('px','');
            let currentTop = (this.$refs[refName].style.top).replace('px','');
            if((currentLeft == this.coordinate.elePosition.left && currentTop == this.coordinate.elePosition.top) 
            || currentLeft == ''||currentTop==''
            ||(currentLeft == this.coordinate.elePosition.left && Math.abs(currentTop - this.coordinate.elePosition.top ) < 1)
            ||(Math.abs(currentLeft - this.coordinate.elePosition.left)< 1  && Math.abs(currentTop - this.coordinate.elePosition.top) < 1 )
            ||(Math.abs(currentLeft - this.coordinate.elePosition.left) < 1 && currentTop == this.coordinate.elePosition.top ) ){
                this.goHome();
            }else{
                if(0 < currentLeft && currentLeft < (innerWidth/2)){
                    // 移动当前元素
                    this.$refs[refName].style.left = 0 + 'px'
                    this.$refs[refName].style.borderRadius = '0px 30px 30px 0px'
                    return
                }else{
                    // 移动当前元素
                    this.$refs[refName].style.left =  innerWidth-this.$refs[refName].offsetWidth + 'px'
                    this.$refs[refName].style.borderRadius = '30px 0px 0px 30px'
                    return
                }
            }
             
        }
    }
}
</script>

<style lang="scss" scoped>
.dragBox {
    width: 50px;
    height: 45px;
    position: fixed;
    right: 0;
    bottom: 135px;
    border-radius: 30px 0px 0px 30px;
    overflow: hidden;
    z-index: 999;
    button {
        width: 100%;
        height: 100%;
        background: #4484fc;
        color: white;
        border: none;
        font-size: 9px;
        text-align: center;
        outline: none;
        span{
            display: block;
        }
        img{
            display: inline-block;
            width: 25px;
            height: auto;
            vertical-align: middle;
        }
    }
}
</style>
