'use strict';

var chai = require('chai');
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../../app');
var User = require('../../models/user');

var clearDb = function(done){
	User.remove({}, function(err) {
		done();
	});
}
describe('Users route', function() {
	before(clearDb)
	describe('Register user', function(done) {
			it('should create a new user.', function(done){
				chai.request(app)
				.post('/users/register')
				.send({username: 'FriskyBiznu', password: 'password1', email:'e@mail.com'})
				.end(function(err, res){
					expect(res.body._id).to.be.ok;
					expect(err).to.be.null;
					expect(res).to.have.status(200)
					done();
			})
		})
	})
	describe('Login user', function(done) {
			it('should authenticate a user.', function(done){
				chai.request(app)
				.post('/users/login')
				.send({username: 'FriskyBiznu', password: 'password1', email:'e@mail.com'})
				.end(function(err, res){
					expect(res.body._id).to.be.ok;
					expect(err).to.be.null;
					expect(res).to.have.status(200)
					done();
			})
		})
	})
	describe('Delete user', function(done) {
			it('should Delete a user.', function(done){
				chai.request(app)
				.delete('/users/')
				.send({id: '566f9de390a87e49e989bec5'})
				.end(function(err, res){
					expect(res.body._id).to.be.undefined;
					expect(err).to.be.null;
					expect(res).to.have.status(200)
					done();
			})
		})
	})
			it('user does not provide username', function(done){
				chai.request(app)
				.post('/users/login')
				.send({password: 'password1', email:'e@mail.com'})
				.end(function(err, res){
					expect(res).to.have.status(400)
					done();
			})
			})
			it('user does not provide password', function(done){
				chai.request(app)
				.post('/users/login')
				.send({username: 'FriskyBiznu', email:'e@mail.com'})
				.end(function(err, res){
					expect(res).to.have.status(400)
					done();
			})
			})
			it('user sucks and does not provide anything', function(done){
				chai.request(app)
				.post('/users/login')
				.send({})
				.end(function(err, res){
					expect(res).to.have.status(400)
					done();
			})
			})
})
