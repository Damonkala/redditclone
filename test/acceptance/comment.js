'use strict';

var chai = require('chai');
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../../app');
var Comment = require('../../models/comment');

var clearDb = function(done){
	Comment.remove({}, function(err) {
		done();
	});
}
describe('Comment route', function() {
	before(clearDb)
	describe('Write Comment', function(done) {
			it('should write a new comment.', function(done){
				chai.request(app)
				.post('/comments/new')
				.send({
					user: 'FriskyBiznu',
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
	// describe('Get all posts', function() {
	// 		it('load posts.', function(done){
	// 			chai.request(app)
	// 			.get('/posts/list')
	// 			.end(function(err, res){
	// 				expect(res).to.have.status(200)
	// 				expect(res).to.have.headers;
	// 				done();
	// 		})
	// 	})
	// })
})
