<template>
  <div id="container">
    <div class="header">
      <span style="float: left">在线客服</span>
    </div>

    <ul class="content"></ul>

    <div class="footer">
      <!-- <div class="icon">
        <img
          src="https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=2680453416,1570907118&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=a5f4ada437074dfca35c1b50e40649b9"
          @click="imgclick"
          alt
          id="icon"
        />
      </div> -->
      <input id="text" type="text" placeholder="说点什么吧..." />
      <span id="btn" @click="btnclick">发送</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: document.getElementById("icon"),
      arr: [
        "https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=2680453416,1570907118&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=a5f4ada437074dfca35c1b50e40649b9",
        "https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=733717429,363003047&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=e781cf317a6ac72636fe1430c476d8aa",
      ],
      tag: 1,
      btn: document.getElementById("btn"),
      num: -1, //统计聊天记录
      messageList: [],
    };
  },
  methods: {
    imgclick() {
      // 根据当前显示的图片切换用户图片。
      if (this.tag == 0) {
        document.getElementById("icon").src = this.arr[1];
        this.tag = 1;
        //console.log(document.getElementById("icon").src);
      } else {
        // document.getElementById("icon").attributes("src",this.arr[0]) ;
        document.getElementById("icon").src = this.arr[0];
        this.tag = 0;
      }
      console.log("tag" + this.tag);
    },

    btnclick() {
      // 判断用户内容是否为空
      var text = document.getElementById("text").value;
      if (text == "") {
        return; //alert("聊天内容不能为空");
      } else {
        // 把用户内容添加到区域区域
        var content = document.getElementsByTagName("ul")[0];
        content.innerHTML +=
          "<li><img src='" +
          this.arr[this.tag] +
          "'/><span>" +
          text +
          "</span></li>";
      }

      var imgs = content.getElementsByTagName("img");
      var span = content.getElementsByTagName("span");
      this.num++;
      console.log(imgs[this.num]);
      console.log(span[this.num]);
      console.log(this.num);
      // 判断当前聊天的用户，0是机器人，1是用户
      if (this.tag == 0) {
        imgs[this.num].className = "imgleft";
        span[this.num].className = "spanleft";
      } else {
        imgs[this.num].className = "imgright";
        span[this.num].className = "spanright";
      }
      //清空聊天内容
      document.getElementById("text").value = "";

      if (this.tag == 1) {
        // this.$options.methods.chat();

        var text = document.getElementById("text").value;

        this.$http.get("static/messagelist.json").then((result) => {
          if (result.body.status === 0) {
            text =
              result.body.message[Math.ceil((Math.random(0.8) * 10) % 5)].text; //有几条消息就%几，把本地json中的机器人回复信息给text   (Math.random(0.8)*10)%5
            console.log(text);
            var content = document.getElementsByTagName("ul")[0];
            content.innerHTML +=
              "<li><img src='" +
              this.arr[0] +
              "'/><span>" +
              text +
              "</span></li>";

            var imgs = content.getElementsByTagName("img");
            var span = content.getElementsByTagName("span");
            this.num++;
            console.log(imgs[this.num]);
            console.log(span[this.num]);
            console.log(this.num);
            // 当前聊天的用户，0是机器人

            imgs[this.num].className = "imgleft";
            span[this.num].className = "spanleft";

            //清空聊天内容
            document.getElementById("text").value = "";
          }
        });
        // 把用户内容添加到区域区域
      }
    },
    // 点击发送时候发送信息,机器人自动回复
    chat() {
      var text = document.getElementById("text").value;
      this.$http.get("static/messagelist.json").then((result) => {
        if (result.body.status === 0) {
          text = result.body.message[0].text; //把本地json中的机器人回复信息给text
          //   this.messageList.push({
          //     message: data.text,
          //     myself: false
          //   });
        }
      });
      // 把用户内容添加到区域区域
      var content = document.getElementsByTagName("ul")[0];
      content.innerHTML +=
        "<li><img src='" + this.arr[0] + "'/><span>" + text + "</span></li>";

      var imgs = content.getElementsByTagName("img");
      var span = content.getElementsByTagName("span");
      this.num++;
      console.log(imgs[this.num]);
      console.log(span[this.num]);
      console.log(this.num);
      // 当前聊天的用户，0是机器人

      imgs[this.num].className = "imgleft";
      span[this.num].className = "spanleft";

      //清空聊天内容
      document.getElementById("text").value = "";

      //   this.messageList.push({
      //     message: this.inputValue,
      //     //这个是判断当前是否是自己输入的内容,自己的是true,机器人的是false
      //     myself: true
      //   });
    },
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: "微软雅黑";
}

#container {
  width: 373px;
  height: 572px;
  background: #eee;
  margin: 0 auto;
  position: relative;
}

.header {
  width: 100%;
  //position: absolute;
  background: #000;
  height: 34px;
  color: #fff;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  padding: 0 10px;
}

.content {
  width: 370px;
  height: 486px;
  font-size: 20px;

  overflow: auto;
  padding: 5px;
}

.content li {
  margin-top: 10px;
  padding-left: 5px;

  width: 100%;
  display: block;
  clear: both;
  overflow: hidden;
}

.content li img {
  float: left;
  width: 40px;
  border-radius: 8px;
}

.content li span {
  background: #7cfc00;
  padding: 10px;
  border-radius: 10px;
  float: left;

  border: 1px solid #ccc;
  box-shadow: 0 0 3px #ccc;
  margin: 6px 10px 0 10px;
  max-width: 310px;
}

.content li img.imgleft {
  float: left;
}

.content li img.imgright {
  float: right;
}

.content li span.spanleft {
  float: left;
  background: #fff;
}

.content li span.spanright {
  float: right;
  background: #7cfc00;
}
.footer {
  width: 100%;
  height: 38px;

  position: absolute;
  bottom: 0px;
}

.footer input {
  //输入框
  width: 90%;
  display: inline-block;
  outline: none;
  font-size: 16px;
  text-indent: 10px;

  border-radius: 6px;
  position: absolute;
}

.footer span {
  //发送按钮
  width: 10%;
  display: inline-block;

  background: #ccc;
  font-weight: 900;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  position: absolute;
  right: 2px;

  border-radius: 6px;
}

.footer span:hover {
  color: #777;
  background: #ddd;
}
</style>