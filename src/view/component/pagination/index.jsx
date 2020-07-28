import React from "react";
import { Pagination } from 'antd';
/**
 * 公共分页组件
 * @param page,number,required 当前页数
 * @param size,number,required 每页条数
 * @param total,number,required 分页总数
 * @param callback,function,required 回调
 * @param pClassName, 分页样式
 */
export default function DhPagination({ page, size, total, callback, pClassName }) {
    if (!callback) { throw new Error('缺少必要参数回调,你可能无法获取分页参数'); }
    if (page !== 0 && !page) { throw new Error('缺少必要参数page,你可能无法当前分页数'); }
    if (size !== 0 && !size) { throw new Error('缺少必要参数size,你可能无法获取分页大小'); }
    if (total !== 0 && !total) { throw new Error('缺少必要参数total,你可能无法正常显示分页'); }
    page = page || 1;
    size = size || 20;
    total = total || 0;
    return <Pagination
        className={pClassName ? pClassName : null}
        showSizeChanger
        pageSizeOptions={['20', '50', '100']}
        pageSize={size}
        current={page}
        onChange={callback}
        onShowSizeChange={callback}
        total={total}
    />;
}