// @ts-ignore
const {Router} = require('express');
const router = Router();
const testersAndTests = require('../models/testersAndTests.js');

router.post(
  '/tester/add',
  async (req, res) => {
   try {
      const result = testersAndTests.addTester(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({id: result.id})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.get(
  '/tester',
  async (req, res) => {
    try {
      let result = testersAndTests.testers;

      res.status(201).json({testers: Array.from(result.entries())})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.put(
  '/tester/change',
  async (req, res) => {
    try {
      const result = testersAndTests.changeTester(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.delete(
  '/tester/delete',
  async (req, res) => {
    try {
      const result = testersAndTests.deleteTester(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({});
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.get(
  '/test',
  async (req, res) => {
    try {
      let result = testersAndTests.tests;

      res.status(201).json({tests: Array.from(result.entries())})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.post(
  '/test/add',
  async (req, res) => {
    try {
      const result = testersAndTests.addTest(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({id: result.id})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.put(
  '/test/change',
  async (req, res) => {
    try {
      const result = testersAndTests.changeTest(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.delete(
  '/test/delete',
  async (req, res) => {
    try {
      const result = testersAndTests.deleteTest(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({});
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

module.exports = router;