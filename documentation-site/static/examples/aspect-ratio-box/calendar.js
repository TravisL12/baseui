import * as React from 'react';
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box';
import {Block} from 'baseui/block';
import {Button, KIND} from 'baseui/button';

const DateBox = props => (
  <AspectRatioBox width={`${100 / 7}%`}>
    <AspectRatioBoxBody as={Button} kind={KIND.minimal} {...props} />
  </AspectRatioBox>
);

export default () => (
  <Block display="flex" flexWrap>
    <DateBox>Feb 1</DateBox>
    <DateBox>2</DateBox>
    <DateBox>3</DateBox>
    <DateBox>4</DateBox>
    <DateBox>5</DateBox>
    <DateBox>6</DateBox>
    <DateBox>7</DateBox>
    <DateBox>8</DateBox>
    <DateBox>9</DateBox>
    <DateBox>10</DateBox>
    <DateBox>11</DateBox>
    <DateBox>12</DateBox>
    <DateBox>13</DateBox>
    <DateBox>14</DateBox>
    <DateBox>15</DateBox>
    <DateBox>16</DateBox>
    <DateBox>17</DateBox>
    <DateBox>18</DateBox>
    <DateBox>19</DateBox>
    <DateBox>20</DateBox>
    <DateBox>21</DateBox>
    <DateBox>22</DateBox>
    <DateBox>23</DateBox>
    <DateBox>24</DateBox>
    <DateBox>25</DateBox>
    <DateBox>26</DateBox>
    <DateBox>27</DateBox>
    <DateBox>28</DateBox>
  </Block>
);
