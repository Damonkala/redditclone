'use strict';

var cp = require('child_process');
var chai = require('chai');
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../../app');
var Post = require('../../models/post');
var User = require('../../models/user');

var dbName = process.env.MONGO_URL.split('/').pop();

var testUser;

var cleanDb = function(done) {
  cp.execFile('./clean-db.sh', [dbName], {cwd: __dirname + '/../scripts/'}, function(){
    User.findById('0000000000000000000000a1', function(err, FriskyBiznu){
      testUser = FriskyBiznu;
      done();
    });
  });
};

describe('Post route', function(done) {
	describe('Create Post', function(done) {
  	beforeEach(cleanDb)
			it('should write a new post.', function(done){
				var token = testUser.token();
				chai.request(app)
				.post('/posts/new')
				.set('Authorization', `Bearer ${token}`)
				.send({
					user: 'FriskyBiznu',
					title: 'Test Post do not upvote',
					content:'What did i tell you?'
				})
				.end(function(err, res){
					expect(res.body._id).to.be.ok;
					expect(err).to.be.null;
					expect(res).to.have.status(200)
					done();
			})
		})
	})
	describe('Get all posts', function(done) {
			it('load posts.', function(done){
				chai.request(app)
				.get('/posts/list')
				.end(function(err, res){
					expect(res).to.have.status(200)
					expect(res).to.have.headers;
					done();
			})
		})
	})
	describe('Delete post', function(done) {
			it('should Delete a post.', function(done){
        var token = testUser.token();
				chai.request(app)
				.delete('/posts/')
        .set('Authorization', `Bearer ${token}`)
				.send({id: '000000000000000000000001'})
				.end(function(err, res){
					// expect(res.body._id).to.be.undefined;
					expect(err).to.be.null;
					expect(res).to.have.status(200)
					done();
			})
		})
	})
})
