import homeModule from './modules/home/home';
import Config from './config';

var appModule = angular.module("cheese", ["ui.router", homeModule.name]);

appModule.config(Config);

