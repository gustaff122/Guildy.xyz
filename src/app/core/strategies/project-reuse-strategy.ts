import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

//tbh - I am not pretty sure how it works, but it works xddd

export class ProjectReuseStrategy implements RouteReuseStrategy {
    
    public shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
    public store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
    public shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null { return null; }
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return false
    }
}