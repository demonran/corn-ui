import Vue from 'vue';
import Select from './select';
import Text from './text';
import RichText from '../tinymce/tinymce.vue';
import Password from './password';
import Image from './image';
import DateUI from './date';
import RadioGroup from './radioGroup';

Vue.component('selectui', Select);
Vue.component('textui', Text);
Vue.component('passwordui', Password);
Vue.component('richtextui', RichText);
Vue.component('imageui', Image);
Vue.component('dateui', DateUI);
Vue.component('radioui',RadioGroup);
