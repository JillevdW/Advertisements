import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import * as Admob from "nativescript-admob";
import { Page } from "tns-core-modules/ui/page/page";
import { View, getViewById } from "tns-core-modules/ui/core/view";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    private androidBannerId: string = "ca-app-pub-XXXX/YYYY";
    private androidInterstitialId: string = "ca-app-pub-KKKK/LLLL";
    private iosBannerId: string = "ca-app-pub-3940256099942544/2934735716";
    // private iosBannerId: string = "/7191/ad/ad.mobile-ios";
    // private iosInterstitialId: string = "ca-app-pub-GGGG/HHHH";

    constructor(private itemService: ItemService, private page: Page) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            // this.createSmartBanner();
            const view = this.page.getViewById("banner").nativeView;
            // console.dir(view);
            this.createBannerForView(view, Admob.AD_SIZE.SMART_BANNER);
        }, 1000);
    }

    public createSmartBanner() {
        this.createBanner(Admob.AD_SIZE.SMART_BANNER);
    }

    public createRegularBanner() {
        this.createBanner(Admob.AD_SIZE.BANNER);
    }

    public createBannerForView(view: any, size: Admob.AD_SIZE) {
        Admob.createBanner({
            testing: true,
            view: view,
            size: size,
            iosBannerId: this.iosBannerId,
            androidBannerId: this.androidBannerId,
            // iosTestDeviceIds: ["yourTestDeviceUDIDs"],
            margins: {
                bottom: 0
            }
        }).then(function() {
            console.log("admob createBanner done");
        }, function(error) {
            console.log("admob createBanner error: " + error);
        });
    }

    public createBanner(size: Admob.AD_SIZE) {
        Admob.createBanner({
            testing: true,
            // view: view,
            size: size,
            iosBannerId: this.iosBannerId,
            androidBannerId: this.androidBannerId,
            iosTestDeviceIds: ["9328dfc3-20e1-4de1-bdd7-af77e389af8"],
            margins: {
                bottom: 200
            }
        }).then(function() {
            console.log("admob createBanner done");
        }, function(error) {
            console.log("admob createBanner error: " + error);
        });
    }

    public hideBanner() {
        Admob.hideBanner().then(function() {
            console.log("admob hideBanner done");
        }, function(error) {
            console.log("admob hideBanner error: " + error);
        });
    }

    // public createInterstitial() {
    //     Admob.createInterstitial({
    //         testing: true,
    //         iosInterstitialId: this.iosInterstitialId,
    //         androidInterstitialId: this.androidInterstitialId,
    //         iosTestDeviceIds: ["yourTestDeviceUDIDs"]
    //     }).then(function() {
    //         console.log("admob createInterstitial done");
    //     }, function(error) {
    //         console.log("admob createInterstitial error: " + error);
    //     });
    // }
}