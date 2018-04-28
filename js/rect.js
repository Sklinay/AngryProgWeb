class Rect {
    constructor(s) {
        this.origin = new Vector(s.x, s.y);
        this.angle = 0;
        Object.defineProperty(this, "width", {
            writable: false,
            value: s.width
        });
        Object.defineProperty(this, "height", {
            writable: false,
            value: s.height
        });

    }
    //getters pour récupérer les points du rectangle (en prenant en compte sa rotation)
    //
    //  A            B
    //   |----------|
    //   |          |
    //   |          |
    //   |          |
    //   |----------|
    //  D            C

    getCentre(){
        return(new Vector(this.origin.x+this.width/2, this.origin.y+this.height/2));
    }

    get_local_point(global_point){
        var centre = this.getCentre();
        var output = global_point.sub(centre);

        return output;
    }

    get_global_point(local_point){
        var centre = this.getCentre();
        var output = local_point.add(centre);

        return output;
    }

    // Non rotated edges
    get_non_rotated_a() {
        return this.origin;
    }
    get_non_rotated_b() {
        return (new Vector(this.origin.x + this.width, this.origin.y));
    }
    get_non_rotated_c() {
        return (new Vector(this.origin.x + this.width, this.origin.y + this.height));
    }
    get_non_rotated_d() {
        return (new Vector(this.origin.x, this.origin.y + this.height));
    }

    rotate_global_point(non_rotated_global_point) {
        var non_rotated_local_point = this.get_local_point(non_rotated_global_point);

        // now apply rotation
        var rotatedX = non_rotated_local_point.x*Math.cos(this.angle*Math.PI/180) - non_rotated_local_point.y*Math.sin(this.angle*Math.PI/180);
        var rotatedY = non_rotated_local_point.x*Math.sin(this.angle*Math.PI/180) + non_rotated_local_point.y*Math.cos(this.angle*Math.PI/180);

        var rotated_local_point = new Vector(rotatedX, rotatedY);

        var rotated_global_point = this.get_global_point(rotated_local_point);
        // translate back

        return (rotated_global_point);
    }

    get_a(){
        var non_rotated_global_point = this.get_non_rotated_a();

        return (this.rotate_global_point(non_rotated_global_point));
    }
    get_b(){
        var non_rotated_global_point = this.get_non_rotated_b();

        return (this.rotate_global_point(non_rotated_global_point));
    }
    get_c(){
        var non_rotated_global_point = this.get_non_rotated_c();

        return (this.rotate_global_point(non_rotated_global_point));
    }
    get_d(){
        var non_rotated_global_point = this.get_non_rotated_d();

        return (this.rotate_global_point(non_rotated_global_point));
    }

    get_edge(num) {
        var mod_num = num % 4;
        switch(mod_num) {
            case 0:
                return this.get_a();
            case 1:
                return this.get_b();
            case 2:
                return this.get_c();
            case 3:
                return this.get_d();
        }
    }

    // Dummy collision rect
    get_dummy_collision_rect_a(){
        var min_x = this.get_edge(0).x;
        var min_y = this.get_edge(0).y;
        for (var i = 1; i < 4; i++) {
            min_x = Math.min(min_x, this.get_edge(i).x);
            min_y = Math.min(min_y, this.get_edge(i).y);
        }

        return (new Vector(min_x, min_y));
    }

    get_dummy_collision_rect_b(){
        var max_x = this.get_edge(0).x;
        var min_y = this.get_edge(0).y;
        for (var i = 1; i < 4; i++) {
            max_x = Math.max(max_x, this.get_edge(i).x);
            min_y = Math.min(min_y, this.get_edge(i).y);
        }

        return (new Vector(max_x, min_y));
    }

    get_dummy_collision_rect_c(){
        var max_x = this.get_edge(0).x;
        var max_y = this.get_edge(0).y;
        for (var i = 1; i < 4; i++) {
            max_x = Math.max(max_x, this.get_edge(i).x);
            max_y = Math.max(max_y, this.get_edge(i).y);
        }

        return (new Vector(max_x, max_y));
    }

    get_dummy_collision_rect_d(){
        var min_x = this.get_edge(0).x;
        var max_y = this.get_edge(0).y;
        for (var i = 1; i < 4; i++) {
            min_x = Math.min(min_x, this.get_edge(i).x);
            max_y = Math.max(max_y, this.get_edge(i).y);
        }

        return (new Vector(min_x, max_y));
    }

    get_dummy_collision_rect_width() {
        return(this.get_dummy_collision_rect_c().x - this.get_dummy_collision_rect_a().x);
    }

    get_dummy_collision_rect_height() {
        return(this.get_dummy_collision_rect_c().y - this.get_dummy_collision_rect_a().y);
    }

    get_dummy_collision_rect_edge(num) {
        var mod_num = num % 4;
        switch(mod_num) {
            case 0:
                return this.get_dummy_collision_rect_a();
            case 1:
                return this.get_dummy_collision_rect_b();
            case 2:
                return this.get_dummy_collision_rect_c();
            case 3:
                return this.get_dummy_collision_rect_d();
        }
    }

    is_dummy_colliding(rect2) {

    }


    //affichage pr debug
    printInfo(){
        console.log("Centre");
        console.log("x : " + this.getCentre().x + " y : " + this.getCentre().y);
        console.log("A");
        console.log("x : " + this.get_a().x + " y : " + this.get_a().y);
        console.log("B");
        console.log("x : " + this.get_b().x + " y : " + this.get_b().y);
        console.log("C");
        console.log("x : " + this.get_c().x + " y : " + this.get_c().y);
        console.log("D");
        console.log("x : " + this.get_d().x + " y : " + this.get_d().y);
    }

    move(v) {
        this.origin = this.origin.add(v);
    }

    mDiff(r) {
        // return new Rect({
        //     x: r.origin.x - this.origin.x - this.width,
        //     y: r.origin.y - this.origin.y - this.height,
        //     width: this.width + r.width,
        //     height: this.height + r.height
        // });
        return new Rect({
            x: r.get_dummy_collision_rect_a().x - this.get_dummy_collision_rect_a().x - this.get_dummy_collision_rect_width(),
            y : r.get_dummy_collision_rect_a().y - this.get_dummy_collision_rect_a().y - this.get_dummy_collision_rect_height(),
            width: this.get_dummy_collision_rect_width() + r.get_dummy_collision_rect_width(),
            height: this.get_dummy_collision_rect_height() + r.get_dummy_collision_rect_height()
        });

    }

    hasOrigin() {
        return (this.origin.x < 0 && this.origin.x + this.width > 0) &&
            (this.origin.y < 0 && this.origin.y + this.height > 0);
    }
}
