<template>
    <div class="matter-sub-photo">
        <el-page-header @back="goBack" content="提交核保资料"></el-page-header>
        <div>
            <div class="matter-sub-inform">
                <p><span>个单号</span><span>3765879124346547</span></p>
                <p><span>被保人姓名</span><span>无言</span></p>
            </div>
            <el-divider></el-divider>
			<p class="matter-sub-tip">请点击下侧的<strong style="color: #fa9604;">相机图标</strong>选择或拍摄您要上传的核保资料，每次点击后最多可选<strong style="color: #000;">9</strong>张图片，最多可反复选择<strong style="color: #000;">99</strong>张。</p>
            <div class="matter-sub-upimg">
                <!-- 上传附件 -->
				<div class="upload-attachment">
					<p>上传附件<span class="attachment-tip">(支持格式：png、jpg、bmp)</span></p>
					<el-upload
					action="no"
					list-type="picture-card"
					multiple
					ref="upload"
					:auto-upload="false"
					:http-request="fileRequest"
					:file-list="fileList"
					:on-change="handleChange"
					>
						<i slot="default" class="el-icon-plus"></i>
						<div slot="file" slot-scope="{file}">
							<img
								class="el-upload-list__item-thumbnail"
								:src="file.url" alt=""
							>
							<span class="el-upload-list__item-actions">
								<span
								class="el-upload-list__item-preview"
								@click.stop="handlePictureCardPreview(file)"
								>
								<i class="el-icon-zoom-in"></i>
								</span>
								<span
								class="el-upload-list__item-delete"
								@click.stop="handleRemove(file)"
								>
								<i class="el-icon-delete"></i>
								</span>
							</span>
						</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</div>
				
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'mattersubphoto',
    data(){
        return{
			dialogVisible:false,
			dialogImageUrl:'',
            fileList:[],
			images : [],
			flagCancal : true,// 判断是否已经取消上传资料
        }
    },
    methods:{
        goBack: function(){
			this.$router.go(-1);
        },
		fileRequest: function(){
			return 
		},
		//监控上传文件列表--检查图片是否重复
        handleChange(file, fileList) {
            let _that = this;
            let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
            if (existFile) {
                this.$message({
                    message: '新选择的图片已经存在,已剔除',
                    type: 'warning'
                });
                fileList.pop();
                // this.fileList = fileList;
                // return false;
            }else{
                let name = file.name, flag = false;
                let type = name.substring(name.lastIndexOf('.')+1)
                if (type == 'png' || type == 'jpg' || type == 'bmp'|| type == 'jpeg') {
                    // return true;
                }else{
                    this.$message({
                                message: '请上传符合格式的图片,不符合格式已剔除',
                                type: 'warning'
                            });
                    fileList.pop();
                    // this.fileList = fileList;
                    // return false;
                }
            }
            this.fileList = fileList;
            console.log("我是fileList:changeon");
            console.log(this.fileList);
        },
		// 微信接口注入
		wxInjection: function(){
			$.post('boundUser_Ajax/enter.action', {
				url : window.location.href
			}, function(data) {
				var singPackage = data.jsonstr;
				var json = JSON.parse(singPackage);
				wx.config({
					debug : false,
					appId : 'wx8016693d70c04bd3',
					timestamp : json.timestamp,
					nonceStr : json.nonceStr,
					signature : json.signature,
					jsApiList : [ 'chooseImage', 'uploadImage' ]
				});
			}, 'json')
		},
		//选择照片
		chooseImageCheck: function(){
			if (!!sessionStorage.getItem('images')) {
				images = JSON.parse(sessionStorage
						.getItem('images'));
			}
			if (images.length < 99) {
				chooseImage(images);
			} else {
				alert_ok("您最多只能选择99张图片", null, "确定");
			}
		},
		//上传照片
		upImage: function(){
			if (!!sessionStorage.getItem('images')) {
				images = JSON.parse(sessionStorage.getItem('images'));// 获取session会话中的images的值
			}
			if (images.length == 0) {
				alert_ok("您还没有选择图片，请先选择上传图片", null, "确定");
				return;
			}

			var imgTo = [];
			if (isAllSuccess(images)) {// ---isALLSuccess判断是否全部上传成功,且没取消
				uploadFn();
			} else {
				if (flagCancal) {
					uploadImgs(images);
				}
			}
		},
		// 获取需上传资料的信息
 		sendImgM: function(imgTo) {
			// 名字
			var agntname = $('#agntname').val();
			// TK
			var agntnum = $('#agntnum').val();
			// 个单号
			var orderNum = $('#orderNumbers').val();
			var orderName = $('#insuredName').val();
			
			// 投保人姓名
			var insureName = $('.detailContent').find('.policyContent p:nth-child(6) span:last-child').text();
			var param = {
				"photo" : imgTo,// 图片
				"orderNum" : orderNum,// 订单号
				"orderName" : orderName,// 客户姓名
				"submitJobno" : agntnum,
				"submitName" : agntname,
				"insureName": insureName

			}
			var jsonObject = (JSON.parse(sessionStorage.getItem('images')))[0];
		//	alert('chooseImage-serverId-sendImgMsg:' + jsonObject.serverId);
		//	alert('imgTo0'+imgTo);
			jQuery.ajaxSettings.traditional = true;
			$.ajax({
				type:"post",
				url:"boundUser_Ajax/changeImage.action",
				data:param,
				dataType:'json',
				async:true,
				success:function(result){
		//			var result = JSON.parse(result);
					var acceptNo = result.acceptNo;
					if(acceptNo!=null){
						tips(acceptNo,'提交完成','受理号：');
						/* $('#acceptanceNumber').text(acceptNo);
						$('#successText').text('提交成功');//完成页面提示词 */
						_acceptFn();
						close_pop();		
						sessionStorage.clear();// 删除会话存储字段images
						sessionStorage.removeItem('images');
						images = [];
						console.log('I am here 20190716')
					}else{
						alert("程序有误，请稍候重试！");
					}
				}
			});

		},
		// 不取消 且 可以上传
		uploadFn: function() {
			var imgTo = [];
			if (flagCancal) {
				var img = JSON.parse(sessionStorage.getItem('images'));
				var jsonObject = (JSON.parse(sessionStorage.getItem('images')))[0];
				//alert('chooseImage-serverId-nextbtn:' + jsonObject.serverId);
				for (var i = 0; i < img.length; i++) {
					var jsonToObject = (JSON.parse(sessionStorage.getItem('images')))[i];
					imgTo.push(jsonToObject.serverId);
					//alert('imgTo:' + imgTo);
				}
				sendImgM(imgTo);
			} else {
				return;
			}
		},
		// 检查图片是否全部成功上传
		isAllSuccess: function(images) {
			var flag = true;
			for (var i = 0; i < images.length; i++) {
				if (images[i].status != 1) {
					flag = false;
				}
			}
			return flag;
		},

		// 上传照片
		uploadImgs: function(images) {
			var i = 0;
			var jsonObject2 = (JSON.parse(sessionStorage.getItem('images')))[0];// 获取图片
			//alert('chooseImage-status:'+ images[i].status);
			function upLoadSingleImg() {
				// 图片状态为0时上传
				if (images[i].status == 0) {
					wx.uploadImage({
								localId : images[i].localId,
								isShowProgressTips : 0,
								success : function(res) {
									images[i].serverId = res.serverId;
									images[i].status = 1;
									i++;
									if (flagCancal) {
										alert_ok(
												'<img style="width: 25px;vertical-align: middle;margin-right: 5px;" src="neworderTracking/img/770.gif"> 已上传：'
														+ i + '/' + images.length,
												null, "取消", cancalFn);
										
									} else {
										return;
									}
									if (i < images.length) {
										
										// window.setTimeout(upLoadSingleImg, 300);
										if (flagCancal) {
											upLoadSingleImg();
										} else {
											return;
										}

									} else {
										
										if (isAllSuccess(images)) {
											sessionStorage.setItem('images', JSON
													.stringify(images));
											uploadFn();// 上傳函數
										} else {
											getUploadFailedImgs(images);
										}
									}
								},
								fail : function(res) {// 微信返回失败信息
									images[i].status = 2;
									// $("#"+images[i].imageId).attr("src","neworderTracking/img/yl-lp/fail.png");
									i++;
									if (i < images.length) {
										upLoadSingleImg();
									} else {
										getUploadFailedImgs(images);
									}
								}
							});
				} else {
					i++;
					
					if (i < images.length) {
						upLoadSingleImg();
					} else {
						if (isAllSuccess(images)) {
							sessionStorage.setItem('images', JSON.stringify(images));

							uploadFn();// 上傳函數

						} else {
							getUploadFailedImgs(images);
						}
					}
				}

			}
			// window.setTimeout("upLoadSingleImg()", 5000);
			if (flagCancal) {
				upLoadSingleImg();
			} else {
				return;
			}

		},
		// 取出上传失败的图片,重新上传
		getUploadFailedImgs: function(images) {
			for (var i = 0; i < images.length; i++) {
				if (images[i].status == 2) {
					function uploadFailImg() {
						var j = 0;
						wx
								.uploadImage({
									localId : images[i].localId,
									isShowProgressTips : 1,
									success : function(res) {
										images[i].serverId = res.serverId;
										images[i].status = 1;
										$("#" + images[i].imageId).attr("src",
												"../img/yl-lp/succ.png");
									},
									fail : function(res) {
										if (j < 5) {
											j++;
											uploadFailImg();
										} else {
											alert_ok("上传图片第" + i + "张失败，请检查网络稍候重试！",
													null, "确定");
										}
									}
								});
					}
					uploadFailImg();
				}
			}
			sessionStorage.setItem('images', JSON.stringify(images));
			if (isAllSuccess(images)) { // 成功上传所有的图片

				uploadFn();// 上傳函數

			} else {
				alert_ok("对不起，您的核保图片未成功上传，请检查网络稍候重试", null, "确定");
			};

		},

		// 选择照片
		chooseImage: function(images) {

		//	alert("201905" + sessionStorage.getItem('images') + images);
			var num = 9;
			if (images.length + 9 > 99) {
				num = 99 - images.length;
			}
			wx.chooseImage({
				count : num, // 默认9
				sizeType : [ 'compressed' ], // 可以指定是原图还是压缩图,此处指定上传压缩图
				sourceType : [ 'album', 'camera' ], // 可以指定来源是相册还是相机，默认二者都有
				success : function(res) {
					var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					for (var i = 0; i < localIds.length; i++) {
						var rptFlag = false;
						for (var j = 0; j < images.length; j++) {
							if (images[j].localId == localIds[i]) {
								rptFlag = true;
							}
						}
						// 如果 localIds[i]图片已经存在于images当中，不重复push
						if (!rptFlag) {
							images.push({
								localId : localIds[i],
								imageId : 'imageId' + parseInt(Math.random() * 10000)
										+ i,
								status : 0,
								serverId : undefined
							});
						}
					}
					sessionStorage.setItem('images', JSON.stringify(images));
					freshImgList(images);

					var jsonObject = (JSON.parse(sessionStorage.getItem('images')))[0];
					// alert('chooseImage-imageId:'+ jsonObject.imageId +'\n'+'status '
					// +jsonObject.status);
				}
			});
		},

		// 删除本地选择图片
		deletePreviewImage: function(currentSrc) {
			if (!!sessionStorage.getItem('images')) {
				images = JSON.parse(sessionStorage.getItem('images'));
			}

			for (var i = 0; i < images.length; i++) {
				if (images[i].localId == currentSrc) {
					images.splice(i, 1);
				}
			}
			sessionStorage.setItem('images', JSON.stringify(images));
			freshImgList(images);
		},

		// 重新选择图片
		reChooseImage: function(currentSrc) {
			if (!!sessionStorage.getItem('images')) {
				images = JSON.parse(sessionStorage.getItem('images'));
			}
			wx.chooseImage({
				count : 1, // 对当前照片重新选择，默认为1张
				sizeType : [ 'compressed' ], // 可以指定是原图还是压缩图，此处指定压缩图
				sourceType : [ 'album', 'camera' ], // 可以指定来源是相册还是相机，默认二者都有
				success : function(res) {
					var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					for (var i = 0; i < images.length; i++) {
						if (images[i].localId == currentSrc) {
							if (currentSrc == localIds[0]) {
								images[i].localId = localIds[0];
							} else {
								images[i].localId = localIds[0];
								images[i].status = 0;
								images[i].serverId = undefined;
							}
						}
					}
					;
					sessionStorage.setItem('images', JSON.stringify(images));
					freshImgList(images);
				}
			});
		},

		// 刷新页面
		freshImgList: function(images) {
			$(".photo_item").remove();
			$("#divImgButtonList").hide();
			$('#global-alert-out').hide();
			var itemHeight = $('#btnAddImgs').height() - 2;
			var itemWidth = $('#btnAddImgs').width() - 2;

			for (var i = 0; i < images.length; i++) {
				var divChild = $("<div class='photo_item'></div>");
				// 上传图片与添加按钮水平对齐
				if (itemHeight > itemWidth) {
					divChild.height(itemHeight);
				} else {
					divChild.height(itemWidth);
				}

				var img = $("<img/>");
				img.addClass("imgSingle");
				img.attr("src", images[i].localId);
				// 为解决微信新版内核src赋值与取值不相同，而造成后续delete及reChooseImage等操作无法匹配问题
				img.data("localID", images[i].localId);
				divChild.append(img);

				var imgOverlay = $("<img/>");
				imgOverlay.addClass("uploadStatus");
				imgOverlay.attr("id", images[i].imageId);

				if (images[i].status == 1) {
					imgOverlay.attr("src", "../img/yl-lp/succ.png");
				} else if (images[i].status == 2) {
					imgOverlay.attr("src", "../img/yl-lp/fail.png");
				}
				divChild.append(imgOverlay);
				$("#btnAddImgs").before(divChild);
				$('#sc').text(images.length);
			}
			if (images.length >= 99) {
				$("#btnAddImgs").hide();
			} else {
				$("#btnAddImgs").show();
			}
			$('.photo_item').children('.imgSingle').click(function() {
				// 为解决微信新版内核src赋值与取值不相同，而造成后续delete及reChooseImage等操作无法匹配问题
				var localid = $(this).data("localID");

				$("#btn_delete").val(localid);
				$("#btn_reChoose").val(localid);
				$("#photo_show img").attr("src", $(this).attr("src"));
				$('#global-alert-out').show();
				var imgHeight = $('#photo_show img').height();
				var winHeight = $(window).height();
				var centerH = (winHeight - imgHeight) / 2;
				$("#photo_show img").css('margin-top', centerH);
				$('#divImgButtonList').slideDown("normal");

			});
		},

		// --------點擊取消上傳----
		cancalFn: function() {
			flagCancal = false;
			alert_ok("您已取消上传。<br/>本次上传失败，如仍需上传，请重新操作", null, "确定", close_Fn);

		},
		close_Fn: function() {// 回到详情页面
			flagCancal = true;
			if (!(typeof ($("#orderNumbers").attr("readonly")) == "undefined")) {
				$('.indexPage').addClass('none').removeClass('block');
				$('.detailPart').addClass('block').removeClass('none');
				$('.uploadPicturesPage').addClass('none').removeClass('block');
				$('.footnote').addClass('none').removeClass('block');
				$('.finishPage').addClass('none').removeClass('block');		
			}else{
				$('.uploadPicturesPage').addClass('block').removeClass('none');
				$('.finishPage').addClass('none').removeClass('block');
				$('#btnAddImgs').prevAll().remove();
				$("#orderNumbers").val('');
				$("#insuredName").val('');
				
			}
			
		}

    }
}
</script>

<style lang="scss" scoped>
.upload-attachment{
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 15px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
	text-align: left;
    p{
        margin-bottom: 5px;
    }
    .attachment-tip{
        font-size: 11px;
        color: #bfbfbf;
    }
}
.matter-sub-inform{
	p{
		font-size: 14px;
		margin: 0;
		margin: 0 15px;
		text-align: left;
		border: 1px solid #ccc;
		border-radius: 5px;
		&:first-child{
			margin-bottom: 5px;
		}
		span{
			width: 100px;
			padding:8px 10px;
			display: inline-block;
			box-sizing: border-box;
			&:first-child{
				border-right: 1px solid #ccc;
			}
			&:last-child{
				color:#666;
			}
		}
	}
}
.matter-sub-tip{
	padding: 0 15px;
	text-align: left;
	font-size: 12px;
	margin-bottom: 0;
}
</style>

<style lang="scss">
.matter-sub-photo{
    .el-page-header{ 
        padding: 10px 15px;
        .el-page-header__left{
            .el-icon-back,
            .el-page-header__title{
                font-size: 13px;
                color: #4484fc;
            }
        }
        .el-page-header__content{
            font-size: 12px;
        }
    }
    .el-dialog__header{
        text-align: left;
    }
    .el-dialog__body{
        padding: 5px 10px;
    }
    .el-dialog__title{
        font-size: 14px;
    }
	.el-upload--picture-card{
		width: 25%;
		height: 80px;
		line-height: 80px;
	}
	.el-upload-list--picture-card .el-upload-list__item{
		width: 25%;
		height: 80px;
		line-height: 80px;
	}
}
</style>