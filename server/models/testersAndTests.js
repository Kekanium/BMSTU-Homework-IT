class TestersAndTests {
    bcount = 0;
    ccount = 0;

    tests = new Map([]);
    testers = new Map([]);

    addTester({name}) {
        this.ccount += 1;
        const id = this.ccount;
        this.testers.set(id, {id, name});

        return {
            isOk: true,
            id,
        };
    }

    changeTester({id, name, tests}) {
        this.testers.set(id, {id, name, tests});

        return {
            isOk: true,
            id,
        };
    }

    changeTest({id, name, place, price}) {
        this.tests.set(id, {id, name, place, price});

        return {
            isOk: true,
            id,
        };
    }

    deleteTester({id}) {
        this.testers.delete(id);

        return {
            isOk: true,
        };
    }

    addTest({name, place, price}) {
        this.bcount += 1;
        const id = this.bcount;
        this.tests.set(id, {id, name, place, price});

        return {
            isOk: true,
            id,
        };
    }

    deleteTest({id}) {
        this.tests.delete(id);

        return {
            isOk: true,
        };
    }
}

module.exports = new TestersAndTests();