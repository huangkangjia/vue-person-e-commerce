import Vue from 'vue'

// VueLazyload
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
	preLoad: 1.3,
	loading: require('../assets/img/lazyload.gif'),
	attempt: 1
})

// ProductZoomer
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer)

// ElementUI
import 'element-ui/lib/theme-chalk/index.css';
import {
	Carousel,
	CarouselItem,
	InputNumber,
	Pagination,
	Form,
	FormItem,
	Input,
	Radio,
	RadioGroup,
} from 'element-ui';
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(InputNumber);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);

// iView
import 'iview/dist/styles/iview.css';
import {
	Affix,
	BackTop,
	Message,
	Checkbox,
	Button,
	LoadingBar,
	Modal
} from 'iview';
Vue.component('Affix', Affix);
Vue.component('BackTop', BackTop);
Vue.component('Checkbox', Checkbox);
Vue.component('Button', Button);
Vue.prototype.$Message = Message
Vue.prototype.$Loading = LoadingBar
Vue.prototype.$Modal = Modal

// moment
import moment from "moment";
Vue.filter('dateFormat', function (value, formatText) {
	if(formatText) return moment(value).format(formatText);
	else return moment(value).format("YYYY年MM月DD日");
})

// filter: NumFormat
Vue.filter('NumFormat', function(value) {
	if(!value) return '0.00';
	value = value.toString()
	var intPart = Number(value).toFixed(0); //获取整数部分
	var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
	var floatPart = ".00"; //预定义小数部分
	var value2Array = value.split(".");
	//=2表示数据有小数位
	if(value2Array.length == 2) {
		floatPart = value2Array[1].toString(); //拿到小数部分
		if(floatPart.length == 1) { //补0,实际上用不着
			return intPartFormat + "." + floatPart + '0';
		} else {
			return intPartFormat + "." + floatPart;
		}
	} else {
		return intPartFormat + floatPart;
	}
})