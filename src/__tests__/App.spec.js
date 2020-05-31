import { shallowMount } from '@vue/test-utils';

import App from '../App.vue';
import { APP_ERROR } from '../constant';

let wrapper;
const factory = (computed = {}) => {
    return shallowMount(App, {
        propsData: {},
        mocks: {},
        stubs: {},
        methods: {},
        computed,
    });
};
beforeEach(() => {
    wrapper = factory();
});

afterEach(() => {
    wrapper.destroy();
});

describe('Component', () => {
    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });
    describe("test textArea", () => {
        test("return App Error Message if given input is other that 'p, r, c'", async () => {
            wrapper.setData({ inputModel: "t" });
            await wrapper.vm.$nextTick();
            expect(wrapper.vm.error).toBe(APP_ERROR);
        });
        test("return polygon value", async () => {
            wrapper.setData({ inputModel: "p 200,10 250,190 160,210" });
            await wrapper.vm.$nextTick();
            expect(wrapper.vm.isPolygon).toBe(true);
            expect(wrapper.vm.polygonPoints).toBe("200,10 250,190 160,210");
        });
        test("return circle value", async () => {
            wrapper.setData({ inputModel: "c 100 100 20" });
            await wrapper.vm.$nextTick();
            expect(wrapper.vm.isCircle).toBe(true);
            expect(wrapper.vm.circle).toEqual({cx: "100", cy: "100", r: "20"});
        });
        test("return rectangle value", async () => {
            wrapper.setData({ inputModel: "r 100 50 25 25" });
            await wrapper.vm.$nextTick();
            expect(wrapper.vm.isRectangle).toBe(true);
            expect(wrapper.vm.rect).toEqual({x: "100", y: "50", w: "25", h: "25"});
        });
        test("return all the given value", async () => {
            wrapper.setData({ inputModel: "p 200,10 250,190 160,210\nc 100 100 20\nr 100 50 25 25\n" });
            await wrapper.vm.$nextTick();
            expect(wrapper.vm.isPolygon).toBe(true);
            expect(wrapper.vm.isCircle).toBe(true);
            expect(wrapper.vm.isRectangle).toBe(true);
            expect(wrapper.vm.polygonPoints).toBe("200,10 250,190 160,210");
            expect(wrapper.vm.circle).toEqual({cx: "100", cy: "100", r: "20"});
            expect(wrapper.vm.rect).toEqual({x: "100", y: "50", w: "25", h: "25"});
        });
        test("return null to all data objects if textArea is empty", async () => {
            wrapper.setData({ inputModel: "" });
            await wrapper.vm.$nextTick();
            expect(wrapper.vm.isPolygon).toBe(false);
            expect(wrapper.vm.isCircle).toBe(false);
            expect(wrapper.vm.isRectangle).toBe(false);
            expect(wrapper.vm.polygonPoints).toBe(null);
            expect(wrapper.vm.circle).toEqual(null);
            expect(wrapper.vm.rect).toEqual(null);
        });
    });
});