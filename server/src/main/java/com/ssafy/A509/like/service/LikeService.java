package com.ssafy.A509.like.service;

import com.ssafy.A509.account.model.User;
import com.ssafy.A509.account.repository.AccountRepository;
import com.ssafy.A509.exception.CustomException;
import com.ssafy.A509.exception.ErrorCode;
import com.ssafy.A509.like.dto.CreateLikeRequest;
import com.ssafy.A509.like.repository.LikeRepository;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;

public abstract class LikeService<T, R extends LikeRepository<?>> {

	protected final AccountRepository accountRepository;

	protected T service;
	protected R likeRepository;

	public LikeService(AccountRepository accountRepository, T service, R likeRepository) {
		this.accountRepository = accountRepository;
		this.service = service;
		this.likeRepository = likeRepository;
	}

	public User getUser(Long userId) {
		return accountRepository.findById(userId)
			.orElseThrow(() -> new CustomException(ErrorCode.NO_SUCH_ACCOUNT, "userId: " + userId));
	}

	@Transactional
	public Long createLike(CreateLikeRequest likeRequest) {
		User user = getUser(likeRequest.getUserId());
		return createLikeObject(likeRequest, user);
	}

	@Transactional
	public abstract void deleteLike(Long id, Long userId);

	public abstract Long getLikeCount(Long id);

	public abstract boolean checkUserLike(Long id, Long userId);

	protected abstract Long createLikeObject(CreateLikeRequest likeRequest, User user);
}
