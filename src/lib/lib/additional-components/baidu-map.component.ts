import { ComponentReader, VElement, ViewData } from '../core/_api';
import { ComponentExample, Workbench } from '../workbench/_api';
import { ImageComponent } from '../components/image.component';

declare const BMapGL: any;

export class BaiduMapComponentReader implements ComponentReader {
  match(element: HTMLElement): boolean {
    return element.nodeName.toLowerCase() === 'img' &&
      /^https:\/\/api\.map\.baidu\.com\/staticimage\/v2/.test((element as HTMLImageElement).src);
  }

  from(element: HTMLImageElement): ViewData {
    const component = new BaiduMapComponent(element.src, {
      width: element?.style.width || '',
      height: element?.style.height || ''
    });
    return {
      component: component,
      slotsMap: []
    }
  }
}

export class BaiduMapComponent extends ImageComponent {

  render(): VElement {
    const el = new VElement(this.tagName);
    el.attrs.set('src', this.src);
    if (this.width) {
      el.styles.set('width', this.width);
    }
    if (this.height) {
      el.styles.set('height', this.height);
    }
    return el;
  }

  clone(): BaiduMapComponent {
    return new BaiduMapComponent(this.src, {
      width: this.width,
      height: this.height
    });
  }
}

export const baiduMapComponentExample: ComponentExample = {
  name: '百度地图',
  example: `<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg viewBox="0 0 1052 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="70"><path d="M1014.113103 1007.051034L781.771034 918.068966l-255.646896 103.106206L249.291034 918.068966l-211.862068 81.213793c-19.067586 7.062069-38.841379-10.593103-33.191725-30.366897l132.06069-456.915862c4.237241-14.830345 14.830345-27.542069 28.954483-33.897931l211.862069-99.575172 149.009655 106.637241 145.478621-92.513104 234.460689 103.106207c15.536552 7.062069 26.835862 20.48 30.366897 36.722759l110.168276 445.616552c5.649655 19.773793-13.417931 36.722759-32.485518 28.954482z" fill="#DFECFD"></path><path d="M377.82069 379.233103L249.997241 918.068966l-211.862069 81.213793c-19.067586 7.062069-38.841379-10.593103-33.191724-30.366897l132.06069-456.915862c4.237241-14.830345 14.830345-27.542069 28.954483-33.897931l211.862069-98.868966z" fill="#C5DCFA"></path><path d="M1012.70069 1010.582069l-232.342069-88.982069-110.168276-524.711724 234.460689 103.106207c15.536552 7.062069 26.835862 20.48 30.366897 36.722758l110.168276 445.616552c5.649655 18.361379-14.124138 35.310345-32.485517 28.248276z" fill="#DFECFD"></path><path d="M782.477241 918.068966l-255.646896 103.106206V485.164138l145.478621-91.806897z" fill="#C5DCFA"></path><path d="M298.725517 795.895172h-2.824827c-2.824828-0.706207-4.943448-0.706207-7.768276-1.412413-7.768276-2.118621-12.005517-9.18069-10.593104-16.948966 1.412414-7.768276 9.18069-12.005517 16.948966-10.593103 2.118621 0.706207 4.237241 0.706207 6.355862 1.412413 7.768276 1.412414 12.711724 8.474483 11.29931 16.242759-0.706207 6.355862-6.355862 11.29931-13.417931 11.29931z m49.434483-2.11862c-6.355862 0-12.005517-4.237241-13.417931-10.593104-2.118621-7.768276 2.824828-15.536552 10.593103-16.948965 2.118621-0.706207 4.237241-1.412414 6.355862-1.412414 7.768276-2.118621 15.536552 2.118621 17.655173 9.18069 2.118621 7.768276-2.118621 15.536552-9.18069 17.655172-2.824828 0.706207-4.943448 1.412414-7.768276 2.118621h-4.237241zM247.172414 774.002759c-2.824828 0-5.649655-0.706207-7.768276-2.118621l-6.355862-4.237241c-6.355862-4.237241-7.768276-13.417931-3.531035-19.773794 4.237241-6.355862 13.417931-7.768276 19.773793-3.531034 2.118621 1.412414 3.531034 2.824828 5.649656 3.531034 6.355862 4.237241 8.474483 12.711724 4.237241 19.773794-2.824828 4.237241-7.062069 6.355862-12.005517 6.355862z m151.834483-3.531035c-4.237241 0-9.18069-2.118621-12.005518-6.355862-4.237241-6.355862-2.824828-15.536552 4.237242-19.773793 2.118621-1.412414 3.531034-2.118621 5.649655-3.531035 6.355862-4.237241 15.536552-2.824828 19.773793 3.531035 4.237241 6.355862 2.824828 15.536552-3.531035 19.773793l-6.355862 4.237241c-2.118621 1.412414-4.943448 2.118621-7.768275 2.118621z m355.928275-16.242758c-7.062069 0-13.417931-5.649655-14.124138-13.417932-0.706207-7.768276 5.649655-14.830345 13.417932-14.830344 1.412414 0 3.531034 0 5.649655-0.706207 7.768276-1.412414 14.830345 3.531034 16.242758 11.29931 1.412414 7.768276-3.531034 14.830345-11.29931 16.242759-2.824828 0.706207-5.649655 0.706207-8.474483 1.412414h-1.412414z m-550.841379-16.948966c-3.531034 0-7.768276-1.412414-9.886896-4.237241-1.412414-1.412414-3.531034-3.531034-4.943449-5.649656-5.649655-5.649655-4.943448-14.830345 0.706207-19.773793 5.649655-4.943448 14.830345-4.943448 19.773793 0.706207 1.412414 1.412414 2.824828 3.531034 4.943449 4.943449 5.649655 5.649655 4.943448 14.830345-0.706207 19.773793-2.824828 2.824828-6.355862 4.237241-9.886897 4.237241z m505.644138 0c-2.824828 0-6.355862-0.706207-8.474483-2.824828-2.118621-1.412414-4.237241-2.824828-5.649655-4.943448-5.649655-4.943448-6.355862-14.124138-1.412414-19.773793 4.943448-5.649655 14.124138-6.355862 19.773793-1.412414 1.412414 1.412414 3.531034 2.824828 4.943449 4.237242 6.355862 4.943448 7.062069 13.417931 2.11862 19.773793-2.824828 2.824828-7.062069 4.943448-11.29931 4.943448z m-266.24-1.412414c-4.237241 0-7.768276-1.412414-10.593103-4.943448-4.943448-5.649655-4.237241-14.830345 1.412413-19.773793 2.118621-1.412414 3.531034-2.824828 4.943449-4.237242 5.649655-4.943448 14.830345-4.237241 19.773793 1.412414 4.943448 5.649655 4.237241 14.830345-1.412414 19.773793-2.118621 1.412414-3.531034 2.824828-5.649655 4.943449-2.118621 1.412414-4.943448 2.824828-8.474483 2.824827z m363.696552-2.824827c-4.943448 0-9.18069-2.118621-12.005517-6.355862-4.237241-6.355862-2.118621-15.536552 4.237241-19.773794 2.118621-1.412414 3.531034-2.118621 5.649655-3.531034 6.355862-4.237241 15.536552-2.824828 19.773793 3.531034 4.237241 6.355862 2.824828 15.536552-3.531034 19.773794l-6.355862 4.237241c-2.824828 1.412414-5.649655 2.118621-7.768276 2.118621zM668.777931 699.144828c-3.531034 0-7.062069-1.412414-9.886897-4.237242-1.412414-1.412414-3.531034-2.824828-4.943448-4.943448-5.649655-4.943448-6.355862-14.124138-0.706207-19.773793 4.943448-5.649655 14.124138-6.355862 19.773793-0.706207 2.118621 1.412414 3.531034 3.531034 5.649656 4.943448 5.649655 5.649655 5.649655 14.124138 0.706206 19.773793-3.531034 3.531034-7.062069 4.943448-10.593103 4.943449z m182.907586 0c-4.237241 0-7.768276-1.412414-10.593103-4.943449-4.943448-5.649655-4.237241-14.830345 1.412414-19.773793 1.412414-1.412414 3.531034-2.824828 4.943448-4.237241 5.649655-4.943448 14.830345-4.237241 19.773793 1.412414 4.943448 5.649655 4.237241 14.830345-1.412414 19.773793-2.118621 1.412414-3.531034 2.824828-5.649655 4.943448-2.118621 1.412414-4.943448 2.824828-8.474483 2.824828z m-367.227586-2.118621c-3.531034 0-7.062069-1.412414-9.886897-4.237241-5.649655-5.649655-5.649655-14.124138 0-19.773794l4.943449-4.943448c5.649655-5.649655 14.124138-5.649655 19.773793-0.706207 5.649655 5.649655 5.649655 14.124138 0.706207 19.773793l-4.943449 4.943449c-2.824828 3.531034-7.062069 4.943448-10.593103 4.943448z m-316.38069-2.824828c-4.237241 0-8.474483-2.118621-11.29931-5.649655-1.412414-2.118621-2.824828-3.531034-4.237241-5.649655-4.943448-6.355862-3.531034-14.830345 2.824827-19.773793 6.355862-4.943448 14.830345-3.531034 19.773793 2.824827l4.237242 5.649656c4.943448 6.355862 3.531034 14.830345-2.824828 19.773793-2.824828 2.118621-5.649655 2.824828-8.474483 2.824827z m456.915862-31.77931c-2.824828 0-5.649655-0.706207-8.474482-2.824828-2.118621-1.412414-3.531034-2.824828-5.649655-4.237241-6.355862-4.237241-7.768276-13.417931-2.824828-19.773793 4.237241-6.355862 13.417931-7.768276 19.773793-2.824828 2.118621 1.412414 3.531034 2.824828 5.649655 4.237242 6.355862 4.943448 7.768276 13.417931 2.824828 19.773793-2.118621 3.531034-6.355862 5.649655-11.299311 5.649655z m269.064828-1.412414c-3.531034 0-7.768276-1.412414-10.593103-4.237241-5.649655-5.649655-4.943448-14.830345 0.706206-19.773793l4.943449-4.943449c5.649655-5.649655 14.830345-4.943448 19.773793 0.706207 5.649655 5.649655 4.943448 14.830345-0.706207 19.773793l-4.943448 4.943449c-2.824828 2.118621-5.649655 3.531034-9.18069 3.531034z m-370.758621-5.649655c-3.531034 0-7.062069-1.412414-9.886896-3.531034-5.649655-5.649655-6.355862-14.124138-0.706207-19.773794 1.412414-2.118621 3.531034-3.531034 4.943448-5.649655 5.649655-5.649655 14.124138-5.649655 19.773793 0 5.649655 5.649655 5.649655 14.124138 0 19.773793-1.412414 1.412414-2.824828 3.531034-4.943448 4.943449-2.118621 2.824828-5.649655 4.237241-9.18069 4.237241z m-387.707586-7.062069c-4.943448 0-9.18069-2.118621-12.005517-6.355862l-4.237241-5.649655c-4.237241-6.355862-2.118621-15.536552 4.237241-19.773793 6.355862-4.237241 15.536552-2.118621 19.773793 4.237241l3.531034 5.649655c4.237241 6.355862 2.824828 15.536552-4.237241 19.773793-1.412414 1.412414-4.237241 2.118621-7.062069 2.118621z m441.37931-14.830345c-1.412414 0-3.531034 0-4.943448-0.706207-1.412414-0.706207-3.531034-1.412414-4.943448-1.412413-7.768276-1.412414-12.711724-9.18069-10.593104-16.948966 2.118621-7.768276 9.18069-12.711724 16.948966-10.593103 2.824828 0.706207 5.649655 1.412414 8.474483 2.824827 7.062069 2.824828 11.29931 10.593103 8.474483 18.361379-2.118621 4.943448-7.062069 8.474483-13.417932 8.474483z"  fill="#B2D0F5"></path><path d="M526.830345 2.824828c129.235862 0 233.754483 104.518621 233.754483 233.754482 0 103.106207-148.303448 307.2-209.037242 386.295173-12.711724 16.948966-38.135172 16.948966-50.846896 0C439.966897 543.77931 291.663448 339.685517 291.663448 236.57931 293.075862 108.049655 397.594483 2.824828 526.830345 2.824828z"  fill="#4988FD"></path><path d="M526.830345 235.873103m-92.513104 0a92.513103 92.513103 0 1 0 185.026207 0 92.513103 92.513103 0 1 0-185.026207 0Z" fill="#2767F4"></path></svg>')}">`,
  componentFactory(workbench: Workbench) {

    const div = document.createElement('div');
    div.classList.add('tbus-form', 'tbus-form-workbench');
    div.style.minWidth = '500px';
    div.innerHTML = `
<form class="tbus-form-title">
  <div class="tbus-input-group tbus-input-block">
    <input type="search" class="tbus-form-control tbus-input-block" placeholder="请输入地址">
    <button type="submit" class="tbus-btn tbus-btn-primary">搜索</button>          
  </div>
</form>
<div class="tbus-baidu-map-container" style="height: 250px">
</div>
<div class="tbus-btn-wrap" style="margin-top: 0;">
<button type="button" class="tbus-btn tbus-btn-primary">确定</button>
<button type="button" class="tbus-btn tbus-btn-default">取消</button>
</div>
    `;
    const mapContainer = div.querySelector('.tbus-baidu-map-container');
    const input = div.querySelector('input');
    const form = div.querySelector('form');
    let map: any;
    let point: any;
    if (!window['BMapGL']) {
      const callbackName = ('callback' + Math.random()).replace('.', '');
      window[callbackName] = function () {
        document.head.removeChild(jsApi);
        map = new BMapGL.Map(mapContainer);
        point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标
        map.centerAndZoom(point, 15);
      }
      const url = 'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=aRsXEo3UFgKwRF6UGZCbNno5rTwlz2zH&callback=' + callbackName;
      const jsApi = document.createElement('script');
      jsApi.src = url;
      document.head.appendChild(jsApi);
    } else {
      map = new BMapGL.Map(mapContainer);
      point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标
      map.centerAndZoom(point, 15);
    }

    workbench.dialog(div);

    form.addEventListener('submit', ev => {
      const myGeo = new BMapGL.Geocoder();
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint(input.value, function (newPoint: any) {
        point = newPoint;
        if (point) {
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMapGL.Marker(point));
        }
      });
      ev.preventDefault();
      return false;
    })

    const buttons = div.querySelectorAll('.tbus-btn-wrap button');

    return new Promise<BaiduMapComponent>((resolve, reject) => {
      buttons.item(1).addEventListener('click', () => {
        workbench.closeDialog();
        reject();
      })
      buttons.item(0).addEventListener('click', () => {
        const center = map.getCenter().lng + ',' + map.getCenter().lat;
        const markers = point.lng + ',' + point.lat;
        const zoom = map.getZoom();

        const url = `https://api.map.baidu.com/staticimage/v2?ak=aRsXEo3UFgKwRF6UGZCbNno5rTwlz2zH&scale=2&markers=${markers}&center=${center}&width=500&height=300&zoom=${zoom}`
        resolve(new BaiduMapComponent(url));
        workbench.closeDialog();
      })
    })
  }
};
