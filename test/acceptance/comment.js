'use strict';

var chai = require('chai');
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../../app');
var Comment = require('../../models/comment');

// var clearDb = function(id){
// 	Comment.removeById(id, function(err) {
// 		done();
// 	});
// }
describe('Comment route', function() {
	// before(clearDb)
	describe('Write Comment on post', function(done) {
			it('should write a new comment on a post.', function(done){
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
					// clearDb(res.body._id)
					done();
			})
		})
	})
	describe('Write Comment on comment', function(done) {
			it('should write a reply comment.', function(done){
				chai.request(app)
				.post('/comments/reply')
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
})
