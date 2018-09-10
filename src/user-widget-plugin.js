import Vue from 'vue'
import UserWidget from './UserWidget.vue'

const Widget = {
    install(Vue, options) {
        Vue.mixin({
            created: function () {
                if(options.hasOwnProperty("uuid")) {
                    this.uuid = options.uuid;
                }
                if(options.hasOwnProperty("type")) {
                    this.type = options.type;
                }
            }
        })
        Vue.component('user-widget', UserWidget);
        // window.UserWidget = UserWidget;
    }
};

export default Widget;

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Widget)
}
