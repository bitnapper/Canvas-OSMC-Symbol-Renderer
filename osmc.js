/**
 *
 * OSMCSymbol object draws an OSMC-Symbols
 *
 * Version: 0.08 beta
 *
 * Copyright 2013 Thorsten Alge <mail@thorsten-alge.de>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */

var OSMCSymbol = function( id, size, str ) {
	var c    = document.getElementById( id );
	this.ctx = c.getContext( '2d' );

	this.osmc = str.split( ':' );

	this.size = size;
	this.defaultLineWidth = size/12;
	this.foregroundRadius = size/2.9;
	this.backgroundRadius = size/2.2;

	// Way Colour
	if( this.osmc[0] !== undefined ) {
		this.setWayColour( this.osmc[0] );
	} else {
		this.setWayColour( null );
	}

	// Background
	if( this.osmc[1] !== undefined ) {
		this.setBackground( this.osmc[1] );
	} else {
		this.setBackground( null );
	}

	// Foreground1
	if( this.osmc[2] !== undefined ) {
		this.setForeground1( this.osmc[2] );
	} else {
		this.setForeground1( null );
	}

	// Foreground2
	if( this.osmc[3] !== undefined ) {
		this.setForeground2( this.osmc[3] );
	} else {
		this.setForeground2( null );
	}

	// Text
	if( this.osmc[4] !== undefined ) {
		this.setText( this.osmc[4] );
	} else {
		this.setText( null );
	}

	// Text Colour
	if( this.osmc[5] !== undefined ) {
		this.setTextColour( this.osmc[5] );
	} else {
		this.setTextColour( null );
	}

	this.error = new Array();
}

OSMCSymbol.prototype = {
	textColours: [
		'black',  'blue',  'brown',
		'gray',   'green', 'orange',
		'purple', 'red',   'white',
		'yellow'
	],

	wayColours: [
		'black', 'blue', 'green',
		'red', 'yellow'
	],

	setBackground: function( arg ) {
		this.background = arg;
	},

	setForeground1: function( arg ) {
		this.foreground1 = arg;
	},

	setForeground2: function( arg ) {
		this.foreground2 = arg;
	},

	setText: function( arg ) {
		if( arg === undefined || typeof arg !== 'string' ) {
			return( false );
		}
		if( arg.length > 3 ) {
			this.text = arg.substr( 0, 3 );
			return;
		}
		this.text = arg;
	},

	setTextColour: function( colour ) {
		if( typeof colour !== 'string' ) {
			this.textColour = 'black'; 
			return;
		}

		colour = colour.toLowerCase();
		for( var i = 0 ; i < this.textColours.length ; i++ ) {
			if( this.textColours[i] === colour ) {
				this.textColour = colour; 
				return;
			}
		}
	},

	setWayColour: function( colour ) {
		if( typeof colour !== 'string' ) {
		} else {
			this.wayColour = 'black'; 
			return;
		}

		colour = colour.toLowerCase();
		for( var i = 0 ; i < this.textColours.length ; i++ ) {
			if( this.textColours[i] === colour ) {
				this.wayColour = colour;
				return;
			}
		}
	},

	getOSMCString: function() {
		return(
			this.wayColour + ':' +
			this.background + ':' +
			this.foreground1 + ':' +
			this.foreground2 + ':' +
			this.text + ':' +
			this.textColour
		);
	},

	getWayColour: function() {
		if( osmc.length >= 1 ) {
			return( osmc[0] );
		} else {
			return( 'incorrect osmc-string' );
		}
	},
	
	_drawBackground: function() {
		switch( this.background ) {
			case '':
				break;
			case 'black':
			case 'blue':
			case 'brown':
			case 'green':
			case 'orange':
			case 'purple':
			case 'red':
			case 'white': this._drawBackgroundColour( this.background ); break;
			case 'black_circle':
			case 'blue_circle':
			case 'red_circle': this._drawBackgroundCircle( 'white', 'red' ); break;
			case 'yellow_circle':
			case 'white_circle': this._drawBackgroundCircle( 'black', 'circle' ); break;
			case 'blue_frame':
			case 'green_frame':
			case 'red_frame':
			case 'yellow_frame': this._drawBackgroundFrame( 'yellow' ); break;
			case 'blue_round':
			case 'green_round':
			case 'red_round':
			case 'white_round': this._drawBackgroundRound( 'white' ); break;
			default:
				this.error.push(
					'Undefined background description: "' + this.background + '"'
				);
		}

	},

	_drawForeground: function( pSymbol ) {

		switch( pSymbol ) {
			case ''                     : break;
			case 'ammonit':
			case 'black_arch'           : this._STILLMISSING(); break; 
			case 'black_bar'            : this._drawBar( 'black' ); break;
			case 'black_circle'         : this._drawCircle( black ); break;
			case 'black_crest'          : this._STILLMISSING(); break;
			case 'black_cross'          : this._drawCross( 'black' ); break;
			case 'black_diamond'        : this._drawDiamond( 'black' ); break;
			case 'black_dot'            : this._drawDot( 'black' ); break;
			case 'black_fork'           :
			case 'black_horse'          :
			case 'black_pointer'        : this._STILLMISSING(); break;
			case 'black_rectangle'      : this._drawRectangle( 'black' ); break;
			case 'black_rectangle_line' : this._drawRectangle( 'black', true ); break;
			case 'black_red_diamond'    : this._drawSeparatedDiamond( 'black', 'red' ); break;
			case 'black_triangle'       : this._drawTriangle( 'black' ); break;
			case 'black_triangle_line'  : this._STILLMISSING(); break;
			case 'black_x'              : this._drawX( 'blue' ); break;
			case 'blue_L'               : this._drawL( 'blue' ); break;
			case 'blue_bar'             : this._drawBar( 'blue' ); break;
			case 'blue_bowl'            : this._STILLMISSING(); break;
			case 'blue_circle'          : this._drawCircle( 'blue' ); break;
			case 'blue_corner'          : this._drawCorner( 'blue' ); break;
			case 'blue_cross'           : this._drawCross( 'blue' ); break;
			case 'blue_diamond'         : this._drawDiamond( 'blue' ); break;
			case 'blue_dot'             : this._drawDot( 'blue' ); break;
			case 'blue_fork'            : this._STILLMISSING(); break;
			case 'blue_lower'           : this._drawLower( 'blue' ); break;
			case 'blue_pointer'         : this._STILLMISSING(); break;
			case 'blue_rectangle'       : this._drawRectangle( 'blue' ); break;
			case 'blue_slash'           : this._drawSlash( 'blue' ); break;
			case 'blue_stripe'          : this._drawStripe( 'blue' ); break;
			case 'blue_triangle'        : this._drawTriangle( 'blue' ); break;
			case 'blue_triangle_turned' : this._drawTriangleTurned( 'blue' ); break;
			case 'blue_turned_T'        : this._drawTurnedT( 'blue' ); break;
			case 'blue_x'               : this._drawX( 'blue' );break;
			case 'bridleway'            : this._STILLMISSING(); break;
			case 'green_L'              : this._drawL( 'green' ); break;
			case 'green_backslash'      : this._drawBackslash( 'green'  ); break;
			case 'green_bar'            : this._drawBar( 'green'  ); break;
			case 'green_bowl'           : this._STILLMISSING(); break;
			case 'green_circle'         : this._drawCircle( 'green' ); break;
			case 'green_corner'         : this._drawCorner( 'green' ); break;
			case 'green_cross'          : this._drawCross( 'green' ); break;
			case 'green_diamond'        : this._drawDiamond( 'green' ); break;
			case 'green_dot'            : this._drawDot( 'green' ); break;
			case 'green_drop_line'      :
			case 'green_fork'           :
			case 'green_horse'          : this._STILLMISSING(); break;
			case 'green_lower'          : this._drawLower( 'green' ); break;
			case 'green_pointer'        : this._STILLMISSING(); break;
			case 'green_rectangle'      : this._drawRectangle( 'green' ); break;
			case 'green_slash'          : this._drawSlash( 'green' ); break;
			case 'green_stripe'         : this._drawStripe( 'green' ); break;
			case 'green_triangle'       : this._drawTriangle( 'green' ); break;
			case 'green_triangle_line'  : this._STILLMISSING(); break;
			case 'green_triangle_turned': this._drawTriangleTurned( 'green' ); break;
			case 'green_turned_T'       : this._drawTurnedT( 'green' ); break;
			case 'green_x'              : this._drawX( 'green' ); break;
			case 'heart'                :
			case 'hiker'                :
			case 'mine'                 : this._STILLMISSING(); break;
			case 'orange_bar'           : this._drawBar( 'orange' ); break;
			case 'orange_diamond_line'  : this._drawDiamond( null, 'orange'  ); break;
			case 'orange_dot'           : this._drawDot( 'orange'  ); break;
			case 'red_L'                : this._drawL( 'red' ); break;
			case 'red_arch'             : this._STILLMISSING(); break;
			case 'red_backslash'        : this._drawBackslash( 'red' ); break;
			case 'red_bar'              : this._drawBar( 'red' ); break;
			case 'red_circle'           : this._drawCircle( 'red' ); break;
			case 'red_corner'           : this._drawCorner( 'red' ); break;
			case 'red_crest'            : this._STILLMISSING(); break;
			case 'red_cross'            : this._drawCross( 'red' ); break;
			case 'red_diamond'          : this._drawDiamond( 'red' ); break;
			case 'red_dot'              : this._drawDot( 'red' ); break;
			case 'red_drop'             :
			case 'red_drop_line'        :
			case 'red_fork'             : this._STILLMISSING(); break;
			case 'red_lower'            : this._drawLower( 'red' ); break;
			case 'red_pointer'          : this._STILLMISSING(); break;
			case 'red_rectangle'        : this._drawRectangle( 'red' ); break;
			case 'red_slash'            : this._drawSlash( 'red' ); break;
			case 'red_stripe'           : this._drawStripe( 'red' ); break;
			case 'red_triangle'         : this._drawTriangle( 'red' ); break;
			case 'red_triangle_turned'  : this._drawTriangleTurned( 'red' ); break;
			case 'red_turned_T'         : this._drawTurnedT( 'red' ); break;
			case 'red_x'                : this._drawX( 'red' ); break;
			case 'shell'                :
			case 'shell_modern'         :
			case 'tower'                :
			case 'white_arch'           : this._STILLMISSING(); break;
			case 'white_bar'            : this._drawBar( 'white' ); break;
			case 'white_circle'         : this._drawCircle( 'white' ); break;
			case 'white_cross'          : this._drawCross( 'white' ); break;
			case 'white_diamond'        : this._drawDiamond( 'white' ); break;
			case 'white_diamond_line'   : this._drawDiamond( null, 'white' ); break;
			case 'white_dot'            : this._drawDot( 'white' ); break;
			case 'white_hiker'          : this._STILLMISSING(); break;
			case 'white_lower'          : this._drawLower( 'white' ); break;
			case 'white_pointer'        : this._STILLMISSING(); break;
			case 'white_rectangle'      : this._drawRectangle( 'white' ); break;
			case 'white_rectangle_line' : this._drawRectangle( 'white', true ); break;
			case 'white_red_diamond'    : this._drawSeparatedDiamond( 'white', 'red' ); break;
			case 'white_stripe'         : this._drawStripe( 'white' ); break;
			case 'white_triangle'       : this._drawTriangle( 'white' ); break;
			case 'white_triangle_line'  : this._STILLMISSING(); break;
			case 'white_turned_T'       : this._drawTurnedT( 'white' ); break;
			case 'white_x'              : this._drawX( 'white' ); break;
			case 'wolfshook'            : this._STILLMISSING(); break;
			case 'yellow_L'             : this._drawL( 'yellow' ); break;
			case 'yellow_backslash'     : this._drawBackslash( 'yellow' ); break;
			case 'yellow_bar'           : this._drawBar( 'yellow' ); break;
			case 'yellow_bowl'          : this._STILLMISSING(); break;
			case 'yellow_circle'        : this._drawCircle( 'yellow' ); break;
			case 'yellow_corner'        : this._drawCorner( 'yellow' ); break;
			case 'yellow_cross'         : this._drawCross( 'yellow' ); break;
			case 'yellow_diamond'       : this._drawDiamond( 'yellow' ); break;
			case 'yellow_dot'           : this._drawDot( 'yellow' ); break;
			case 'yellow_fork'          : this._STILLMISSING(); break;
			case 'yellow_lower'         : this._drawLower( 'yellow' ); break;
			case 'yellow_pointer'       : this._STILLMISSING(); break;
			case 'yellow_rectangle'     : this._drawRectangle( 'yellow' ); break;
			case 'yellow_rectangle_line': this._drawRectangle( 'yellow', true ); break;
			case 'yellow_slash'         : this._drawSlash( 'yellow' ); break;
			case 'yellow_stripe'        : this._drawStripe( 'yellow' ); break;
			case 'yellow_triangle'      : this._drawTriangle( 'yellow' ); break;
			case 'yellow_turned_T'      : this._drawTurnedT( 'yellow' ); break;
			case 'yellow_x'             : this._drawX( 'yellow' ); break;
			default:
				this.error.push( 'Undefined foreground description: "' + pSymbol + '"' );
				break;
		}
	},

	_drawBackgroundColour: function( colour ) {
			this.ctx.fillStyle = colour;
			this.ctx.fillRect( 0, 0, this.size, this.size );
	},

	_drawBackgroundCircle: function( fillColour, strokeColour ) {
			this.ctx.lineWidth   = this.defaultLineWidth;
			this.ctx.fillStyle   = fillColour;
			this.ctx.strokeStyle = strokeColour;
			this.ctx.beginPath();
			this.ctx.arc(
				this.size/2, this.size/2,
				this.backgroundRadius, 0,
				2*Math.PI
			);
			this.ctx.stroke();
			this.ctx.fill();
			this.ctx.strokeStyle = "none"; // resetting
	},

	_drawBackgroundFrame: function( colour ) {
			this.ctx.beginPath();
			this.ctx.rect(
				this.defaultLineWidth/2,
				this.defaultLineWidth/2,
				this.size-this.defaultLineWidth,
				this.size-this.defaultLineWidth
			);
			this.ctx.lineWidth = this.defaultLineWidth;
			this.ctx.strokeStyle = colour;
			this.ctx.fillStyle   = "white";
			this.ctx.stroke();
			this.ctx.fill();
			this.ctx.strokeStyle = "none"; // resetting
	},
	
	_drawBackgroundRound: function( colour ) {
			this.ctx.beginPath();
			this.ctx.arc(
				this.size/2, this.size/2,
				this.backgroundRadius, 0,
				2*Math.PI
			);
			this.ctx.fillStyle = colour;
			this.ctx.fill();

	},

	_drawBackslash: function( colour ) {
		this.ctx.beginPath();
		this.ctx.moveTo( 0, 0);
		this.ctx.moveTo( this.size, (this.size/4)*3 );
		this.ctx.lineTo( this.size, this.size );
		this.ctx.lineTo( 0, this.size/4 );
		this.ctx.lineTo( 0, 0 );
		this.ctx.closePath();
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawBar: function( colour ) {
		this.ctx.rect( 0, this.size/3, this.size, this.size/3 );
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawCircle: function( colour ) {
		this.ctx.beginPath();
		this.ctx.arc(
			this.size/2, this.size/2,
			this.foregroundRadius, 0,
			2*Math.PI
		);
		this.ctx.lineWidth = this.defaultLineWidth;
		this.ctx.strokeStyle = colour;
		this.ctx.stroke();
	},

	_drawCorner: function( colour ) {
		this.ctx.beginPath();
		this.ctx.moveTo( 0, 0 );
		this.ctx.lineTo( this.size, 0 );
		this.ctx.lineTo( this.size, this.size );
		this.ctx.moveTo( 0, 0 );
		this.ctx.closePath();
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawCross: function( colour ) {
		this._drawBar( colour );
		this._drawStripe( colour );
	},
/*
	_drawDiamondLine: function( colour ) {
		this.ctx.beginPath();
		this.ctx.moveTo( this.size/2, this.size/4 );
		this.ctx.lineTo( (this.size/4)*3, this.size/2 );
		this.ctx.lineTo( this.size/2, (this.size/4)*3 );
		this.ctx.lineTo( this.size/4, this.size/2 );
		this.ctx.lineTo( this.size/2, this.size/4 );
		this.ctx.closePath();
		this.ctx.lineWidth = this.defaultLineWidth;
		this.ctx.strokeStyle = colour;
		this.ctx.stroke();
	},*/

	_drawDiamond: function( colour, stroke ) {
		this.ctx.beginPath();
		this.ctx.moveTo( this.size/2, this.size/8 );
		this.ctx.lineTo( (this.size/8)*7, this.size/2 );
		this.ctx.lineTo( this.size/2, (this.size/8)*7 );
		this.ctx.lineTo( this.size/8, this.size/2 );
		this.ctx.lineTo( this.size/2, this.size/8 );
		this.ctx.closePath();
		if( colour !== null ) {
			this.ctx.fillStyle = colour;
			this.ctx.fill();
		}
		if( stroke !== undefined ) {
			this.ctx.lineWidth   = this.defaultLineWidth;
			this.ctx.strokeStyle = stroke;
			this.ctx.stroke();
		}
	},

	_drawDot: function( colour ) {
		this.ctx.beginPath();
		this.ctx.arc(
			this.size/2, this.size/2,
			this.foregroundRadius, 0,
			2*Math.PI
		);
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawL: function( colour ) {
		this.ctx.beginPath();
		this.ctx.moveTo( (this.size/8)*3, 0 );
		this.ctx.lineTo( (this.size/8)*3, (this.size/8)*5 );
		this.ctx.lineTo( this.size , (this.size/8)*5 );
		this.ctx.lineTo( this.size,  (this.size/8)*3 );
		this.ctx.lineTo( (this.size/8)*5, (this.size/8)*3 );
		this.ctx.lineTo( (this.size/8)*5, 0 );
		this.ctx.closePath();
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawLower: function( colour ) {
		this.ctx.rect( this.size/3, this.size/3, this.size/3, this.size/3 );
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawRectangle: function( colour, stroke ) {
		if( colour === undefined ) {
			return( false );
		}
		this.ctx.rect( this.size/4, this.size/4, this.size/2, this.size/2 );
		if( colour !== null ) {
			this.ctx.fillStyle = colour;
			this.ctx.fill();
		}
		if( stroke !== undefined && stroke === true ) {
			this.ctx.lineWidth   = this.defaultLineWidth;
			this.ctx.strokeStyle = '#000';
			this.ctx.stroke();
		}
	},

	_drawSeparatedDiamond: function( colour1, colour2 ) {
		if( colour1 === undefined || colour2 === undefined ) {
			return( false );
		}

		// draw left triangle
		this.ctx.beginPath();
		this.ctx.moveTo( this.size/2,  this.size/4 );
		this.ctx.lineTo( this.size/4,  this.size/2 );
		this.ctx.lineTo( this.size/2, (this.size/4)*3 );
		this.ctx.closePath();
		this.ctx.fillStyle = colour1;
		this.ctx.fill();

		// draw right triangle
		this.ctx.beginPath();
		this.ctx.moveTo( this.size/2,  this.size/4 );
		this.ctx.lineTo( (this.size/4)*3,  this.size/2 );
		this.ctx.lineTo( this.size/2, (this.size/4)*3 );
		this.ctx.closePath();
		this.ctx.fillStyle = colour2;
		this.ctx.fill();

		// ToDo
	},

	_drawSlash: function( colour ) {
		this.ctx.beginPath();
		this.ctx.moveTo( this.size, 0 );
		this.ctx.lineTo( 0, (this.size/4)*3 );
		this.ctx.lineTo( 0, this.size );
		this.ctx.lineTo( this.size, this.size/4 );
		this.ctx.lineTo( this.size, 0 );
		this.ctx.closePath();
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawStripe: function( colour ) {
		this.ctx.rect( this.size/3, 0, this.size/3, this.size );
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawText: function() {
		var fontSize = Math.round(this.size/3.25);
		this.ctx.fillStyle    = this.textColour;
		this.ctx.font         = 'bold ' + fontSize + 'px Arial';
		this.ctx.textAlign    = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillText(
			this.text,
			this.size/2,
			this.size/2
		);
	},

	_drawTriangle: function( colour ) {
		var Mx = My = this.size/2;
		var r = this.backgroundRadius;
		this.ctx.beginPath();
		this.ctx.moveTo( Mx, My - r );
		this.ctx.lineTo(
			Mx - ( 3 * r ) / ( 2 * Math.sqrt( 3 ) ),
			My + ( r / 2 )
		);
		this.ctx.lineTo(
			Mx + ( 3 * r ) / ( 2 * Math.sqrt( 3 ) ),
			My + ( r / 2 )
		);
		this.ctx.closePath();
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawTriangleTurned: function( colour ) {
		var Mx = My = this.size/2;
		var r = this.backgroundRadius;
		this.ctx.beginPath();
		this.ctx.moveTo( Mx, My + r );
		this.ctx.lineTo(
			Mx - ( 3 * r ) / ( 2 * Math.sqrt( 3 ) ),
			My - ( r / 2 )
		);
		this.ctx.lineTo(
			Mx + ( 3 * r ) / ( 2 * Math.sqrt( 3 ) ),
			My - ( r / 2 )
		);
		this.ctx.closePath();
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawTurnedT: function( colour ) {
		this.ctx.beginPath();
		this.ctx.moveTo( (this.size/8)*3, 0 );
		this.ctx.lineTo( (this.size/8)*3, (this.size/8)*6 );
		this.ctx.lineTo( 0, (this.size/8)*6 );
		this.ctx.lineTo( 0, this.size );
		this.ctx.lineTo( this.size, this.size );
		this.ctx.lineTo( this.size, (this.size/8)*6 );
		this.ctx.lineTo( (this.size/8)*5, (this.size/8)*6 );
		this.ctx.lineTo( (this.size/8)*5, 0 );
		this.ctx.closePath();
		this.ctx.fillStyle = colour;
		this.ctx.fill();
	},

	_drawX: function( colour ) {
		this._drawSlash( colour );
		this._drawBackslash( colour );
	},

	drawOSMCSymbol: function() {
		// draw Background
		if( this.background !== null ) {
			this._drawBackground();
		}

		// draw first foreground symbol if set
		if( this.foreground1 !== null ) {
			this._drawForeground( this.foreground1 );
		}

		// draw second foreground symbol if set
		if( this.foreground2 !== null ) {
			this._drawForeground( this.foreground2 );
		}

		// check if text and textcolour is set
		if( this.text !== undefined && this.text !== null ) {
			this._drawText();
		}
	},

	_STILLMISSING: function() {
		console.log( 'Not yet implemented: \'' + pSymbol + '\'' );
	}
}
