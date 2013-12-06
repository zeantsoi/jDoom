"use strict";
	
//////////////////////////////////////////////////
//author:Dane Hansen/////////////////////////////
//www.danehansen.com////////////////////////////
///////////////////////////////////////////////

	//requires danehansen/MyUtils.js

var MyTimerEvent={TIMER:"myTimer", TIMER_COMPLETE:"myTimerComplete"};

function MyTimer(delay, repeatCount)
{
	this._currentCount=0;
	this._delay=delay;
	this._lastTime=null;
	this.repeatCount(repeatCount||0);
	this._running=false;
	this._timeLeft=delay;
	this._timeout=null;
	this._timerCallbacks=[];
	this._timerCompleteCallbacks=[];
	this._onTimerHandler=MyUtils.bind(this._onTimer,this);
}

//getters/setters

	MyTimer.prototype.currentCount=function()
	{
		return this._currentCount;
	}

	MyTimer.prototype.delay=function(num)
	{
		if(typeof num=="number")
		{
			this._delay=num;
			if(this._running)
			{
				this.stop();
				this._timeLeft=this._delay;
				this.start();
			}
		}
		else
		{
			return this._delay;
		}
	}

	MyTimer.prototype.repeatCount=function(num)
	{
		if(typeof num=="number")
			this._repeatCount=parseInt(num);
		else
			return this._repeatCount;
	}

	MyTimer.prototype.running=function()
	{
		return this._running;
	}

//methods

	//public

		MyTimer.prototype.addEventListener=function(event, callback)
		{
			if(event==MyTimerEvent.TIMER)
			{
				if(this._timerCallbacks.indexOf(callback)==-1)
					this._timerCallbacks.push(callback);
			}
			else if(event==MyTimerEvent.TIMER_COMPLETE)
			{
				if(this._timerCompleteCallbacks.indexOf(callback)==-1)
					this._timerCompleteCallbacks.push(callback);
			}
		}

		MyTimer.prototype.removeEventListener=function(event, callback)
		{
			if(event==MyTimerEvent.TIMER)
			{
				var index=this._timerCallbacks.indexOf(callback);
				if(index>=0)
					this._timerCallbacks.splice(index,1);
			}
			else if(event==MyTimerEvent.TIMER_COMPLETE)
			{
				index=this._timerCompleteCallbacks.indexOf(callback);
				if(index>=0)
					this._timerCompleteCallbacks.splice(index,1);
			}
		}

		MyTimer.prototype.reset=function()
		{
			if(this._running)
				this.stop();
			this._timeLeft=this._delay;
			this._currentCount=0;
		}

		MyTimer.prototype.start=function()
		{
			if(!this._running)
			{
				this._running=true;
				this._increment();
			}
		}

		MyTimer.prototype.stop=function()
		{
			clearTimeout(this._timeout);
			this._timeLeft=this._delay-Date.now()+this._lastTime;
			this._running=false;
		}

	//private
	
		MyTimer.prototype._increment=function()
		{
			this._lastTime=Date.now();
			this._timeout=setTimeout(this._onTimerHandler, this._timeLeft);
			this._timeLeft=this._delay;
		}

		MyTimer.prototype._onTimer=function()
		{
			this._currentCount++;
			var evt={target:this, currentTarget:this, type:MyTimerEvent.TIMER};
			for(var i=0, iLen=this._timerCallbacks.length; i<iLen; i++)
			{
				this._timerCallbacks[i](evt);
			}
			if(this._currentCount!=this._repeatCount)
				this._increment();
			else
				this._onTimerComplete();
		}

		MyTimer.prototype._onTimerComplete=function()
		{
			this._running=false;
			var evt={target:this, currentTarget:this, type:MyTimerEvent.TIMER_COMPLETE};
			for(var i=0, iLen=this._timerCompleteCallbacks.length; i<iLen; i++)
			{
				this._timerCompleteCallbacks[i](evt);
			}
		}