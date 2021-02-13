import Vue from "vue";
import Notification from "./Tips.vue";

const NotificationConstructor = Vue.extend(Notification);

const instances = []; // tips队列

// 消除Vue实例
const removeInstance = instance => {
    if (!instance) return;
    const len = instances.length;
    const index = instances.findIndex(ins => instance.id === ins.id);
    instances.splice(index, 1);
    if (len <= 1) return;
    const removeHeight = instance.height;
    for (let i = index; i < len - 1; i++) {
        instances[i].verticalOffset =
            parseInt(instances[i].verticalOffset) - removeHeight - 16;
    }
};

const notify = (options = {}) => {
    // 判断当前 Vue 实例是否运行于服务器。
    if (Vue.prototype.$isServer) return;
    // 获取vue实例
    let instance = new NotificationConstructor({
        propsData: options, // 这里是传进来一组props(显示内容等...)
        data() {
            return {
                verticalOffset: 0, // 每个tips距离顶部的距离
                timer: null, // 定时器id
                visible: false,// 是否显示
                height: 0,
            };
        },
        computed: {
            // 设置tips组件的位置
            position() {
                var isposition = options.position || 'top' // 位置
                if (isposition === 'topRight') {
                    return {
                        top: `${this.verticalOffset}px`,
                        right: 0
                    }
                } else if (isposition === 'topLeft') {
                    return {
                        top: `${this.verticalOffset}px`,
                        left: 0
                    }
                } else if (isposition === 'bottomRight') {
                    return {
                        bottom: `${this.verticalOffset}px`,
                        right: 0
                    }
                } else if (isposition === 'bottomLeft') {
                    return {
                        bottom: `${this.verticalOffset}px`,
                        left: 0
                    }
                } else if (isposition === 'bottom') {
                    return {
                        bottom: `${this.verticalOffset}px`,
                        right: '50%',
                        transform: 'translateX(50%)'
                    }
                } else {
                    return {
                        top: `${this.verticalOffset}px`,
                        right: '50%',
                        transform: 'translateX(50%)'
                    }
                }
            },
            type() {
                var type = options.type || 'default' // 类型
                if (type === 'success') {
                    return {
                        backgroundColor: '#F0F9EB',
                        color: '#67C23A',
                        border: '1px solid #E1F3D8'
                    }
                } else if (type === 'error') {
                    return {
                        backgroundColor: '#FEF0F0',
                        color: '#F56C6C',
                        border: '1px solid #FDE2E2'
                    }
                } else if (type === 'default') {
                    return {
                        backgroundColor: '#EDF2FC',
                        color: '#909399',
                        border: '1px solid #EBEEF5'
                    }
                }
            },
            center() {
                var center = options.center || false // 是否居中
                if (center) {
                    return {
                        justifyContent: 'center'
                    }
                }
            }
        },
        mounted() {
            this.createTimer();
            this.$el.addEventListener("mouseenter", () => {
                if (this.timer) {
                    this.clearTimer(this.timer);
                }
            });
            this.$el.addEventListener("mouseleave", () => {
                if (this.timer) {
                    this.clearTimer(this.timer);
                }
                this.createTimer();
            });
        },
        updated() {
            this.height = this.$el.offsetHeight;
        },
        beforeDestroy() {
            this.clearTimer();
        },
        methods: {
            // 创建计时器
            createTimer() {
                this.timer = setTimeout(() => {
                    this.visible = false;
                    document.body.removeChild(this.$el);
                    removeInstance(this);
                    this.$destroy();
                }, options.timeout * 1000 || 5000);
            },
            // 清除计时器
            clearTimer() {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            // 关闭消息弹窗
            handleClose() {
                this.visible = false;
                document.body.removeChild(this.$el);
                removeInstance(this);
                this.$destroy(true);
            },
            // 过渡js钩子
            handleAfterEnter() {
                this.height = this.$el.offsetHeight;
            },
        },
    });

    let seed = 1;
    const id = `notification_${seed++}`; // 动态生成唯一Id
    instance.id = id;
    // 生成vue中的$el
    instance = instance.$mount();
    // 将$el中的内容插入dom节点中去
    document.body.appendChild(instance.$el);
    instance.visible = true; // 显示出tips
    let verticalOffset = 0;
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16; // 设置多个tips上下距离
    });
    verticalOffset += 16;
    instance.verticalOffset = verticalOffset;
    instances.push(instance);
    return instance;
};

export default notify;