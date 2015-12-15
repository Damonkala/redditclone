'use strict';

var chai = require('chai');
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../../app');
var Post = require('../../models/post');

var clearDb = function(id, done){
	Post.findByIdAndRemove(id, function(err) {
		done();
	});
}
describe('Post route', function(done) {
	// before(clearDb)
	describe('Create Post', function(done) {
			it('should write a new post.', function(done){
				chai.request(app)
				.post('/posts/new')
				.send({
					user: 'FriskyBiznu',
					title: 'Test Post do not upvote',
					content:'What did i tell you?'
				})
				.end(function(err, res){
					expect(res.body._id).to.be.ok;
					expect(err).to.be.null;
					expect(res).to.have.status(200)
					clearDb(res.body._id)
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
				chai.request(app)
				.delete('/posts/')
				.send({id: '566fa2461740aba0ea1aa55d'})
				.end(function(err, res){
					// expect(res.body._id).to.be.undefined;
					expect(err).to.be.null;
					expect(res).to.have.status(200)
					done();
			})
		})
	})
})
