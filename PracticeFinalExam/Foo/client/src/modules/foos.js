
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Foo } from '../resources/data/foo-object';

@inject(Router, Foos)
export class Foos {
	constructor(router, foo) {
		this.router = router;
		this.foo = foo;
		this.message = 'Foos';
		this.showFooEditForm = false;
	}

	async activate() {
		await this.getFoo();
	}

	attached() {
		feather.replace()
	}

	async getFoo() {
		await this.foo.getFoo();
	}

	newFoo() {
		this.foo = {
			foo: "",
			woo: "foo"
		}
		this.openEditForm();
	}

	editFoo(foo) {
		this.foo = foo;
		this.showFooEditForm = true;
	}

	openEditForm() {
		this.showFooEditForm = true;
		setTimeout(() => { $("#foo").focus(); }, 500);

	}
	// changeActive(foo) {
	// 	this.foo = foo;
	// 	this.save();
	// }

	async save() {
		if (this.foo && this.foo.foo && this.foo.woo)
			await this.foo.saveFoo(this.foo);
		await this.getFoo();
		this.back();

	}

	async delete() {
		if (this.foo) {
			await this.foo.delete(this.foo);
			await this.getFoo();
			this.back();
		}
	}

	back() {
		this.showFooEditForm = false;
	}

}


