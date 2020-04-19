<!--  -->
<template>
    <div>
        <ClientOnly>
            <slot name="before" />
            <span ref="countUp"></span>
        </ClientOnly>
    </div>
</template>

<script>

export default {
    name: "CountUp",
    props: {
        startVal: {
            type: Number,
            default: 0
        },
        endVal: {
            type: Number,
            required: true
        },
        decimalPlaces: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 2
        },
        delay: {
            type: Number,
            default: 0
        }
    },
    components: {

    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.counter.reset();
        this.counter = null
    },
    methods: {
        init() {
            import("countup.js").then(module => {
                this.$nextTick(() => {
                    this.counter = new module.CountUp(this.$refs.CountUp, this.endVal, {
                        startVal: this.startVal,
                        decimalPlaces: this.decimalPlaces,
                        duration: this.duration
                    });
                    setTimeout(() => {
                        this.counter.start();
                    }, this.delay);
                })
            })
        }
    },
    data() {
        return { counter: null }
    },
}
</script>